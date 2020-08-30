import React, { useEffect, useState } from "react";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalButton } from "react-paypal-button-v2";

import { Input, Select, MenuItem, Button, Modal } from "@material-ui/core";
import "./css/CheckoutForm.css";
import PayPal from "./images/paypal3.png";
import * as firebase from "firebase";
import api from "./api";
import LoadingPage from "./LoadingPage";
import PlacesAutocomplete from "./PlacesAutocomplete";
import checkEmail from "./global_methods/checkEmail";

export default class CheckoutForm extends React.Component {
  lngPerMile = 57;
  latPerMile = 69;

  constructor(props) {
    super(props);
    this.state = {
      signedIn: this.props.signedIn,
      amount: 0,
      currency: "",
      description: "",
      clientSecret: null,
      error: null,
      metadata: null,
      succeeded: false,
      processing: false,
      loaded: false,
      myData: null,
      finished: false,
      deliveryType: localStorage.getItem("deliveryType"),
      timesCalledStripe: 0,
      address1: "",
      address2: "",
      email: "",
      paypalModal: true,
    };
  }

  render() {
    // Get our parameters
    const q = window.location.search;
    const urlParams = new URLSearchParams(q);

    if (this.state.loaded) {
      // Cancelled. Just the token.
      if (urlParams.get("token")) {
        alert("Paypal Transacton cancelled");
        window.history.replaceState(null, null, "/");
      } else if (urlParams.get("success")) {
        this.handlePaypalResponse();
      }
    }

    this.state.myData = this.props.myData;
    const signedInWithFirebase = !!firebase.auth().currentUser;

    const options = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };

    if (this.state.succeeded) {
      const email = document.getElementById("email").value.trim().toLowerCase();

      var cart = this.state.myData.cart;
      var tempCart = JSON.parse(JSON.stringify(this.state.myData.cart));
      console.log(tempCart);

      api.sendEmail(
        email,
        "Thank you for your purchase!\n\n You purchased: " +
          this.state.myData.cart.length +
          "items for $" +
          this.props.total +
          ". " +
          "\n\nItems will be delivered to " +
          localStorage.getItem("deliverAddress") +
          " " +
          localStorage.getItem("deliverAddress2") +
          " " +
          localStorage.getItem("deliverCity") +
          " the next morning!"
      );
      api.sendEmail(
        "andrew@collection.deals",
        "Thank you for your purchase!\n\n You purchased: " +
          this.state.myData.cart.length +
          " items for $" +
          this.props.total +
          ". " +
          "\n\nItems will be delivered to " +
          localStorage.getItem("deliverAddress") +
          " " +
          localStorage.getItem("deliverAddress2") +
          " " +
          localStorage.getItem("deliverCity") +
          " the next morning!"
      );

      for (var i = 0; i < tempCart.length; i++) {
        tempCart[i]["address"] = localStorage.getItem("deliverAddress");
        tempCart[i]["address2"] = localStorage.getItem("deliverAddress2");
        tempCart[i]["city"] = localStorage.getItem("deliverCity");
      }
      localStorage.setItem("deliverAddress", "");
      localStorage.setItem("deliverAddress2", "");
      localStorage.setItem("deliverCity", "");

      const orders = this.state.myData.orders;

      // Update my own cart and remove everything

      var newOrders = orders.concat(tempCart);

      var myUid = null;

      if (firebase.auth().currentUser) {
        // Signed in
        myUid = firebase.auth().currentUser.uid;
      } else if (localStorage.getItem("tempUid")) {
        // temporarily signed in
        myUid = localStorage.getItem("tempUid");
      } else {
        // Not signed in
        myUid = null;
      }

      const itemUids = [];
      for (var i = 0; i < cart.length; i++) {
        itemUids.push(cart[i].uid);
      }

      firebase
        .firestore()
        .collection("Users")
        .doc(myUid)
        .update({
          customer_id: this.state.customer_id ? this.state.customer_id : "",
          orders: newOrders,
        })
        .then(() => {
          var a_index = 0;
          for (var i = 0; i < cart.length; i++) {
            const item = cart[i];

            // Deleted all items from database

            firebase
              .firestore()
              .collection("Categories")
              .doc(item.category)
              .collection("All")
              .doc(item.uid)
              // .update({})
              .update({ deleting_now: true })
              .then((f) => {
                firebase
                  .firestore()
                  .collection("Categories")
                  .doc(item.category)
                  .collection("All")
                  .doc(item.uid)
                  .delete()
                  .then(() => {
                    a_index++;
                    if (a_index === cart.length) {
                      firebase
                        .firestore()
                        .collection("Users")
                        .where("cart", "array-contains-any", cart)
                        .get()
                        .then((user) => {
                          const userDocs = user.docs;
                          if (userDocs.length === 0) {
                            // Shouldn't be, i'm removing from my own cart
                          }
                          var b_index = 0;
                          var k = 0;
                          var looping = true;

                          // All the users with an item in their cart
                          for (var k = 0; k < userDocs.length; k++) {
                            const userData = userDocs[k];
                            const newCart = userData.data().cart;
                            // All the items in a users cart
                            for (var p = 0; p < newCart.length; p++) {
                              // All the items we are looking for
                              var l = 0;
                              while (l < itemUids.length) {
                                if (!newCart[p]) {
                                  break;
                                }
                                if (newCart[p].uid === itemUids[l]) {
                                  l = 0;
                                  // Remove the item
                                  newCart.splice(p, 1);
                                }
                                l++;
                              }
                            }
                            firebase
                              .firestore()
                              .collection("Users")
                              .doc(userData.id)
                              .update({
                                cart: newCart,
                              })
                              .then(() => {
                                b_index++;
                                if (b_index === userDocs.length) {
                                  localStorage.setItem("cart", "0");
                                  console.log("DONE");
                                  // Go through and add all the unique ID's to seller_array
                                  const sellerArray = [];
                                  tempCart.forEach((uniqueItem) => {
                                    const seller = uniqueItem.seller;
                                    if (!sellerArray.includes(seller)) {
                                      sellerArray.push(seller);
                                    }
                                  });
                                  // Add to our orders
                                  firebase
                                    .firestore()
                                    .collection("Orders")
                                    .doc()
                                    .set({
                                      items: tempCart,
                                      seller_array: sellerArray,
                                    })
                                    .then(() => {
                                      this.props.finished();
                                    });
                                }
                              });
                          }
                        });
                    }
                  });
              });
          }
        });

      return (
        <div>
          <div>Your payment was successful!</div>
        </div>
      );
    }

    this.componentDidUpdate();
    return (
      <div>
        {this.state.loadingIcon && (
          <div>
            <LoadingPage />
          </div>
        )}
        {/* {this.state.paypalModal && (
         
        )} */}

        {signedInWithFirebase && (
          // Were signed in to firebase. Show the users cards
          <form
            style={{
              paddingLeft: 0,
              minWidth: 400,
              maxWidth: 600,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                Delivery Info
              </div>
              <PlacesAutocomplete
                updateAddress={(address) =>
                  this.setState({
                    address1: address,
                  })
                }
                checkoutPage={true}
                loading={(loaded) => this.loading(loaded)}
                activeButton={false}
                modal={null}
              />
              <input
                onChange={(e) =>
                  this.setState({
                    address2: e.target.value,
                  })
                }
                value={this.state.address2}
                id="address2"
                style={{
                  width: "42vw",
                  marginBottom: 0,
                  marginTop: 20,
                  borderRadius: 3,
                  borderWidth: 1.5,
                  borderStyle: "solid",
                  borderWidth: 1.5,
                  borderColor: "rgb(118, 118, 118)",
                  borderRadius: 3,
                  height: "6vh",
                  fontSize: 18,
                  paddingLeft: 10,
                }}
                placeholder="Apt, Floor, Suite"
              ></input>

              <input
                onChange={(e) =>
                  this.setState({
                    email: e.target.value,
                  })
                }
                value={this.state.email}
                id="email"
                style={{
                  width: "42vw",
                  marginTop: 20,
                  borderRadius: 3,
                  borderWidth: 1.5,
                  borderStyle: "solid",
                  borderWidth: 1.5,
                  borderColor: "rgb(118, 118, 118)",
                  borderRadius: 3,
                  height: "6vh",
                  fontSize: 18,
                  paddingLeft: 10,
                }}
                placeholder="Email"
              ></input>
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                marginBottom: 10,
                textAlign: "center",
                marginTop: 50,
              }}
            >
              Payment
            </div>

            <div
              className="sr-combo-inputs"
              style={{ minWidth: 400, maxWidth: 550 }}
            >
              <div className="sr-combo-inputs-row">
                <CardElement
                  className="sr-input sr-card-element"
                  options={options}
                />
              </div>
            </div>

            <button
              id="pay"
              style={{
                backgroundColor: "#426CB4",
                height: 58,
                width: "100%",
                borderRadius: 5,
                borderWidth: 0,
                color: "white",
                fontWeight: 600,
                fontSize: 20,
              }}
              className="btn"
              disabled={
                this.state.processing ||
                !this.state.clientSecret ||
                !this.props.stripe
              }
            >
              {this.state.processing ? "Processing…" : "Add Card"}
            </button>

            <div
              style={{
                textAlign: "center",
                fontWeight: 500,
                marginBottom: 20,
                marginTop: 20,
                minWidth: 400,
                maxWidth: 600,
                color: "grey",
              }}
            >
              OR
            </div>

            <form
              id="paypal-form"
              on
              action="http://localhost:4242/paypal"
              method="POST"
            >
              <input
                style={{ height: 0, width: 0, visibility: "hidden" }}
                type="text"
                id="price"
                name="pricename"
                value={this.props.total}
              />
              <input
                style={{ height: 0, width: 0, visibility: "hidden" }}
                type="text"
                id="type"
                name="type"
                value={"desktop"}
              ></input>

              <div
                id="paypal-button"
                onClick={() => this.payWithPaypal()}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: "#ffc439",
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: 0,
                  outline: "none",
                }}
              >
                <img src={PayPal} style={{ width: 100, height: 100 }} />
              </div>
            </form>

            <div style={{ height: 50 }}></div>
          </form>
        )}

        {!signedInWithFirebase && (
          // Not signed in. Show the temporary modal
          <form
            onSubmit={(ev) => this.andrewMethod(ev)}
            style={{
              paddingLeft: 0,
              minWidth: 400,
              maxWidth: 600,
            }}
          >
            {this.state.error && (
              <div className="message sr-field-error">{this.state.error}</div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                Delivery Info
              </div>
              <PlacesAutocomplete
                checkoutPage={true}
                loading={(loaded) => this.loading(loaded)}
                activeButton={false}
                modal={null}
              />
              <input
                onChange={(e) =>
                  this.setState({
                    address2: e.target.value,
                  })
                }
                value={this.state.address2}
                style={{
                  width: "42vw",
                  marginBottom: 0,
                  marginTop: 20,
                  borderRadius: 3,
                  borderWidth: 1.5,
                  borderStyle: "solid",
                  borderWidth: 1.5,
                  borderColor: "rgb(118, 118, 118)",
                  borderRadius: 3,
                  height: "6vh",
                  fontSize: 18,
                  paddingLeft: 10,
                }}
                placeholder="Apt, Floor, Suite"
              ></input>

              <input
                onChange={(e) =>
                  this.setState({
                    email: e.target.value,
                  })
                }
                value={this.state.email}
                id="email"
                style={{
                  width: "42vw",
                  marginTop: 20,
                  borderRadius: 3,
                  borderWidth: 1.5,
                  borderStyle: "solid",
                  borderWidth: 1.5,
                  borderColor: "rgb(118, 118, 118)",
                  borderRadius: 3,
                  height: "6vh",
                  fontSize: 18,
                  paddingLeft: 10,
                }}
                placeholder="Email"
              ></input>
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                marginBottom: 10,
                textAlign: "center",
                marginTop: 50,
              }}
            >
              Payment
            </div>

            <div
              className="sr-combo-inputs"
              style={{ minWidth: 400, maxWidth: 550 }}
            >
              <div className="sr-combo-inputs-row">
                <CardElement
                  className="sr-input sr-card-element"
                  options={options}
                />
              </div>
            </div>

            <button
              id="pay"
              style={{
                backgroundColor: "#426CB4",
                height: 58,
                width: "100%",
                borderRadius: 5,
                borderWidth: 0,
                color: "white",
                fontWeight: 600,
                fontSize: 20,
              }}
              className="btn"
              disabled={
                this.state.processing ||
                !this.state.clientSecret ||
                !this.props.stripe
              }
            >
              {this.state.processing ? "Processing…" : "Add Card"}
            </button>

            <div style={{ minWidth: 400, maxWidth: 600, marginTop: 20 }}>
              <PayPalButton
                shippingPreference="NO_SHIPPING"
                amount={this.props.total}
                onCancel={(e) =>
                  this.setState({
                    loadingIcon: false,
                    call: false,
                  })
                }
                onClick={(e) => this.andrewMethod2(e)}
                onError={(e) => {
                  console.log(e);
                  alert("error");
                }}
                onSuccess={(details, data) => {
                  this.setState({
                    error: null,
                    succeeded: true,
                    processing: false,
                    loadingIcon: false,
                  });

                  // OPTIONAL: Call your server to save the transaction
                  return api.payWithPaypal().then((res) => {});
                }}
                options={{
                  clientId:
                    "AVWKPfLbUrnVVHtF3EqllXbIqqAhJvRrlwa9vVi4k_uFGT4Jcd7TSsWxXKdGED5B66RNcrczgnnISVLk",
                  // clientId:
                  //   "AagrypGvYi5QmDHv0rhdJnr91B_Qha89rbKFeLqjv6kUBHUd5MTMMOsRj88Q_erUKM9jQaxaO4d2pLhm",
                  currency: "USD",
                  // merchantId: "3WEGGZYB8FJFL",
                  disableFunding: "card,credit",
                }}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                fontWeight: 500,
                marginBottom: 20,
                marginTop: 20,
                minWidth: 400,
                maxWidth: 600,
                color: "grey",
              }}
            >
              OR
            </div>

            <div style={{ height: 50 }}></div>
          </form>
        )}
      </div>
    );
  }

  // Handle the response from the Paypal Server
  async handlePaypalResponse() {
    return;
    // 1) Remove bad items from cart
    // await this.deleteItemsAndRemoveFromCart(result);
    // 2) Email a reciept
    const email = this.state.email;
    const cart = this.state.myData.cart;

    var emailText =
      "Thank you for your purchase!\n\nYou purchased: " +
      cart.length +
      " items for $" +
      this.props.totalAmount +
      ". " +
      "\n\nItems will be delivered to " +
      this.state.address1 +
      ", " +
      this.state.address2 +
      " the next morning!" +
      "\n\n";

    api.sendEmail(email, emailText);
    api.sendEmail("andrew@collection.deals", emailText);

    // this.setState({
    //   showModal: false,
    //   paymentComplete: true,
    //   paymentDetails: result,
    // });
  }

  paypalFrame() {
    const frame = document.getElementById("paypal-frame");
    frame.contentWindow.foo = function () {
      alert("sdfpisdof");
    };
  }

  // Pay with Paypal!
  async payWithPaypal() {
    // 0) Get all the information
    const form = document.getElementById("paypal-form");
    const address1 = this.state.address1;
    const address2 = this.state.address2;
    const email = this.state.email.trim().toLowerCase();
    const currentUser = !!firebase.auth().currentUser;
    var myUid = localStorage.getItem("tempUid");
    if (currentUser) {
      myUid = firebase.auth().currentUser.uid;
    }
    // if (!this.checkAddress(address1) || !checkEmail(email)) {
    //   return;
    // }

    // // 1) Update the users address (If they are one)
    // if (currentUser) {
    //   await firebase
    //     .firestore()
    //     .collection("Users")
    //     .doc(firebase.auth().currentUser.uid)
    //     .update({
    //       address1: address1,
    //       address2: address2,
    //     });
    // }

    // // 2) Check if the items are still valid
    // const itemResult = await this.checkItems();
    // if (itemResult.length != this.state.myData.cart.length) {
    //   alert(
    //     "Something in your cart has been purchased. you have not been charged."
    //   );
    //   await firebase
    //     .firestore()
    //     .collection("Users")
    //     .doc(myUid)
    //     .update({
    //       cart: itemResult,
    //     })
    //     .then(() => {
    //       this.props.navigation.goBack();
    //     });
    //   return;
    // }

    // 3) Submit the form
    form.submit();
  }

  checkAddress(address) {
    if (!address || address == "") {
      alert("Please input an address!");
      return false;
    }
    return true;
  }

  andrewMethod2(e) {
    const first = document.getElementById("first").value.trim();
    // const last = document.getElementById("last").value.trim();
    const address1 = document.getElementById("address1").value.trim();
    const address2 = document.getElementById("address2").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").textContent;
    const email = document.getElementById("email").value.trim().toLowerCase();

    if (
      first == "" ||
      address1 == "" ||
      zip == "" ||
      city == "" ||
      state == "" ||
      email == ""
    ) {
      alert("Please fill out all info");
      window.location.href = "/checkout";
      return;
    } else if (!this.checkEmail(email)) {
      window.location.reload();
    }

    localStorage.setItem("fname", first);
    localStorage.setItem("address1", address1);
    localStorage.setItem("address2", address2);
    localStorage.setItem("zip", zip);

    if (!this.state.call) {
      var myUid = null;
      localStorage.setItem("deliverAddress", address1);
      localStorage.setItem("deliverAddress2", address2);
      localStorage.setItem("deliverCity", city);
      this.setState({
        loadingIcon: true,
        call: true,
      });

      if (firebase.auth().currentUser) {
        // Signed in
        myUid = firebase.auth().currentUser.uid;
      } else if (localStorage.getItem("tempUid")) {
        // temporarily signed in
        myUid = localStorage.getItem("tempUid");
      }

      this.checkAddress()
        .then((b) => {
          if (b === true && first && address1 && zip && city && state) {
            this.checkItems().then((a) => {
              if (!a) {
              } else if (a.length === this.state.myData.cart.length) {
              } else {
                alert(
                  "Something in your cart has been purchased. You have not been charged."
                );
                firebase
                  .firestore()
                  .collection("Users")
                  .doc(myUid)
                  .update({
                    cart: a,
                  })
                  .then(() => {
                    window.location.href = "/checkout";
                  });
              }
            });
          } else if (b == -1) {
            console.log("FAILED");
            this.setState({
              loadingIcon: false,
            });
            alert("Please fill out all info above");
            window.location.reload();
          } else {
            console.log("FAILED2");
            this.setState({
              loadingIcon: false,
            });
            alert(
              "Sorry, you are too far for delivery. We'll be in your town soon!"
            );
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log(e.message);
          this.setState({
            loadingIcon: false,
          });
        });
    }
  }

  andrewMethod(ev) {
    console.log("Andrew method");
    var myUid = null;
    this.setState({
      loadingIcon: true,
    });

    if (firebase.auth().currentUser) {
      // Signed in
      myUid = firebase.auth().currentUser.uid;
    } else if (localStorage.getItem("tempUid")) {
      // temporarily signed in
      myUid = localStorage.getItem("tempUid");
    }
    ev.preventDefault();
    const x = ev.target;
    this.checkAddress()
      .then((b) => {
        console.log(b);
        if (b === true) {
          this.checkItems().then((a) => {
            console.log(a);
            const y = x;
            if (!a) {
              alert("uh oh");
            } else if (a.length === this.state.myData.cart.length) {
              this.handleSubmit(y);
            } else {
              alert(
                "Something in your cart has been purchased. You have not been charged."
              );
              firebase
                .firestore()
                .collection("Users")
                .doc(myUid)
                .update({
                  cart: a,
                })
                .then(() => {
                  window.location.href = "/checkout";
                });
            }
          });
        } else if (b == -1) {
          this.setState({
            loadingIcon: false,
          });
          alert("Please enter your address");
        } else {
          this.setState({
            loadingIcon: false,
          });
          alert(
            "Sorry, you are too far for delivery. We'll be in your town soon!"
          );
        }
      })
      .catch((e) => {
        console.log(e.message);
        this.setState({
          loadingIcon: false,
        });
      });
  }

  setPickup(e) {
    const value = e.target.value;

    if (value === "pickup") {
      localStorage.setItem("deliveryType", "pickup");
      this.props.setShipping(true, value, false, value);
      this.setState({
        delivery: false,
        deliveryType: value,
      });
    } else {
      localStorage.setItem("deliveryType", "delivery");
      this.props.setShipping(true, value, true, value);
      this.setState({
        delivery: true,
        deliveryType: value,
      });
    }
  }

  componentDidUpdate() {
    if (
      this.state.processing ||
      this.state.succeeded ||
      this.state.clientSecret ||
      this.state.timesCalledStripe > 3
    ) {
      return null;
    }

    var total = this.total;

    if (this.state.deliveryType === "delivery") {
      total += 1;
    }

    // Step 1: Fetch product details such as amount and currency from
    // API to make sure it can't be tampered with in the client.

    // const cart = api.getProductDetails(this.state.myData.cart);
    // this.state.subTotal = cart.subTotal;
    // this.state.description = cart.description;
    // this.state.pictures = cart.pictures;
    // this.state.tax = cart.tax;
    // this.state.shipping = cart.shipping;
    // this.state.total = cart.total;
    // this.state.amount = cart.amount;
    // this.state.currency = cart.currency;

    console.log("GOT PRODUCT DETAILS");

    // Step 2: Create PaymentIntent over Stripe API

    // Total is fucked up?
    console.log(this.props.total);
    api
      .createPaymentIntent({ total: this.props.total, stripe_unique_id: "xb" })
      .then((clientSecret) => {
        console.log(clientSecret);
        // this.state.clientSecret = clientSecret;
        // this.state.loaded = true;

        this.setState({
          clientSecret: clientSecret,
          loaded: true,
          timesCalledStripe: this.state.timesCalledStripe + 1,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          error: err.message,
          timesCalledStripe: this.state.timesCalledStripe + 1,
        });
      });
  }

  async checkItems() {
    // Check that all items are still available
    var index = 0;
    const itemsInDb = [];
    var cart = this.state.myData.cart;
    for (var i = 0; i < cart.length; i++) {
      const item = cart[i];
      console.log(item);
      if (i === cart.length - 1) {
        return await firebase
          .firestore()
          .collection("Categories")
          .doc(item.category)
          .collection("All")
          .doc(item.uid)
          .get()
          .then((e) => {
            index++;
            if (e.exists) {
              itemsInDb.push(e.data());
            }
            console.log(itemsInDb);

            if (index === cart.length) {
              return itemsInDb;
            }
          })
          .catch((e) => {
            return false;
          });
      } else {
        await firebase
          .firestore()
          .collection("Categories")
          .doc(item.category)
          .collection("All")
          .doc(item.uid)
          .get()
          .then((e) => {
            index++;
            if (e.exists) {
              itemsInDb.push(e.data());
            }
          })
          .catch((e) => {
            return false;
          });
      }
    }
  }

  async handleSubmit(ev) {
    const API_KEY = "AIzaSyBbpHHOjcFkGJeUaEIQZ-zNVaYBw0UVfzw";

    const first = document.getElementById("first").value.trim();
    // const last = document.getElementById("last").value.trim();
    const address1 = document.getElementById("address1").value.trim();
    const address2 = document.getElementById("address2").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").textContent;
    const email = document.getElementById("email").value.trim().toLowerCase();

    // const url =
    //   "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    //   address1 +
    //   "&key=" +
    //   API_KEY;

    if (first === "") {
      this.setState({
        loadingIcon: false,
      });
      alert("Please enter your first name");
      return;
    } else if (address1 === "") {
      this.setState({
        loadingIcon: false,
      });
      alert("Please enter your address");
      return;
    } else if (zip === "") {
      this.setState({
        loadingIcon: false,
      });
      alert("Please enter a valid zip");
      return;
    } else if (city === "") {
      this.setState({
        loadingIcon: false,
      });
      alert("Please enter your city");
      return;
    } else if (state === "State") {
      this.setState({
        loadingIcon: false,
      });
      alert("Please enter your state");
      return;
    } else if (!this.checkEmail(email)) {
      this.setState({
        loadingIcon: false,
      });
      return false;
    }

    localStorage.setItem("deliverAddress", address1);
    localStorage.setItem("deliverAddress2", address2);
    localStorage.setItem("deliverCity", city);
    localStorage.setItem("email", email);

    this.setState({
      processing: true,
    });
    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    const payload = await this.props.stripe.confirmCardPayment(
      this.state.clientSecret,
      {
        payment_method: {
          card: this.props.elements.getElement(CardElement),
          billing_details: {
            name: ev.name.value,
          },
        },
      }
    );

    if (payload.error) {
      this.setState({
        loadingIcon: false,
        error: `Payment failed: ${payload.error.message}`,
        processing: false,
      });
      alert(payload.error.message);

      console.log("[error]", payload.error);
    } else {
      this.setState({
        error: null,
        succeeded: true,
        processing: false,
        metadata: "",
        customer_id: "",
        loadingIcon: false,
      });
      return;
      // Pay out all the sellers (0.3% of item price)
      const sellers = [];
      for (var i = 0; i < this.state.myData.cart.length; i++) {
        const item = this.state.myData.cart[i];
        const arrItem = { id: item.seller, cost: item.original_price };
        sellers.push(arrItem);
      }
      var i_index = 0;
      for (var i = 0; i < sellers.length; i++) {
        // Regular sale, pay the seller
        api
          .createTransfers({
            seller: sellers[i].id,
            cost: sellers[i].cost,
            worker: false,
          })
          .then((res) => {
            i_index++;
            if (i_index == sellers.length) {
              // Create our customer DELETED
              api
                .createCustomer()
                .then((e) => {
                  console.log(e);
                  const id = e.id;
                  this.setState({
                    error: null,
                    succeeded: true,
                    processing: false,
                    metadata: payload.paymentIntent,
                    customer_id: id,
                    loadingIcon: false,
                  });
                })
                .catch(() => {
                  this.setState({
                    error: null,
                    succeeded: true,
                    processing: false,
                    metadata: "",
                    customer_id: "",
                    loadingIcon: false,
                  });
                });
            }
            console.log(res);
          })
          .catch((e) => {
            this.setState({
              loadingIcon: false,
            });
            alert(e.message);
          });
      }
      //Pay out the gig worker (0.6%)
      // api.createTransfers({
      //   seller: "xxx",
      //   cost: this.props.total,
      //   worker: true,
      // });

      console.log("[PaymentIntent]", payload.paymentIntent);
    }
  }
}
