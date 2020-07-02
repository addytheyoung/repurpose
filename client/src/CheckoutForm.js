import React, { useEffect, useState } from "react";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalButton } from "react-paypal-button-v2";

import { Input, Select, MenuItem, Button } from "@material-ui/core";
import "./css/CheckoutForm.css";

import * as firebase from "firebase";
import api from "./api";
import ClipLoader from "react-spinners/ClipLoader";

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
      email: "",
      address: "",
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
    };
  }

  render() {
    this.state.myData = this.props.myData;

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
      const categoryList = [
        "Art",
        "Books",
        "Collectibles",
        "Decoration",
        "Electronics",
        "Fashion",
        "Movies&Games",
        "Other",
      ];

      var cart = this.state.myData.cart;
      var tempCart = JSON.parse(JSON.stringify(this.state.myData.cart));
      console.log(tempCart);

      api.sendEmail(
        this.state.myData.email,
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
      console.log(tempCart);
      console.log(cart);

      // Update my own cart and remove everything

      var newOrders = orders.concat(tempCart);

      console.log(newOrders);

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
            console.log(item.category);
            console.log(item.uid);
            console.log("********(*****");
            firebase
              .firestore()
              .collection("Categories")
              .doc(item.category)
              .collection("All")
              .doc(item.uid)
              // .update({})
              .update({ deleting_now: true })
              .then((f) => {
                console.log(f);
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
                          console.log(userDocs.length);
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
                                  console.log("splicing array");
                                  l = 0;
                                  // Remove the item
                                  newCart.splice(p, 1);
                                }
                                l++;
                              }
                            }
                            console.log(newCart);
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
          <div
            style={{
              position: "absolute",
              left: "45vw",
              top: 200,
            }}
          >
            <ClipLoader
              size={150}
              color={"#123abc"}
              loading={this.state.loading}
            />
          </div>
        )}

        {/* {this.props.deliveryType === "delivery" && (
          <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 500 }}>
       
              <div>
                Flat fee of $1.00 for delivery. <br /> <br />
                <br />
              </div>
            
          </div>
        )} */}
        {/* {this.props.deliveryType === "pickup" && (
          <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 500 }}>
            Pickup location is 2414 Longview Street, <br />
            Austin TX. We'll send you an email to confirm.
          </div>
        )} */}

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

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Delivery Address
            </div>
            <Input
              defaultValue={
                localStorage.getItem("fname")
                  ? localStorage.getItem("fname")
                  : ""
              }
              id="first"
              style={{ margin: 10 }}
              placeholder="First Name"
            ></Input>
            <Input
              defaultValue={
                localStorage.getItem("lname")
                  ? localStorage.getItem("lname")
                  : ""
              }
              id="last"
              style={{ margin: 10 }}
              placeholder="Last Name"
            ></Input>
            {this.props.deliveryType === "delivery" && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Input
                  defaultValue={
                    localStorage.getItem("address1")
                      ? localStorage.getItem("address1")
                      : ""
                  }
                  id="address1"
                  style={{ margin: 10 }}
                  placeholder="Address Line 1"
                ></Input>
                <Input
                  defaultValue={
                    localStorage.getItem("address2")
                      ? localStorage.getItem("address2")
                      : ""
                  }
                  id="address2"
                  style={{ margin: 10 }}
                  placeholder="Address Line 2 (optional)"
                ></Input>
                <Input
                  defaultValue={
                    localStorage.getItem("zip")
                      ? localStorage.getItem("zip")
                      : ""
                  }
                  id="zip"
                  style={{ margin: 10 }}
                  placeholder="Zip Code"
                ></Input>
                <Input
                  id="city"
                  style={{ margin: 10 }}
                  placeholder="City"
                ></Input>
                <Select
                  defaultValue={"State"}
                  placeholder={"State"}
                  style={{ margin: 10 }}
                  id="state"
                >
                  <MenuItem value="State">
                    <div style={{ color: "#a1a1a1" }}>State</div>
                  </MenuItem>
                  <MenuItem value="AK">AK</MenuItem>
                  <MenuItem value="AL">AL</MenuItem>
                  <MenuItem value="AR">AR</MenuItem>
                  <MenuItem value="AZ">AZ</MenuItem>
                  <MenuItem value="CA">CA</MenuItem>
                  <MenuItem value="CO">CO</MenuItem>
                  <MenuItem value="CT">CT</MenuItem>
                  <MenuItem value="DC">DC</MenuItem>
                  <MenuItem value="DE">DE</MenuItem>
                  <MenuItem value="FL">FL</MenuItem>
                  <MenuItem value="GA">GA</MenuItem>
                  <MenuItem value="IA">IA</MenuItem>
                  <MenuItem value="ID">ID</MenuItem>
                  <MenuItem value="IL">IL</MenuItem>
                  <MenuItem value="IN">IN</MenuItem>
                  <MenuItem value="KS">KS</MenuItem>
                  <MenuItem value="KY">KY</MenuItem>
                  <MenuItem value="LA">LA</MenuItem>
                  <MenuItem value="MA">MA</MenuItem>
                  <MenuItem value="MD">MD</MenuItem>
                  <MenuItem value="ME">ME</MenuItem>
                  <MenuItem value="MI">MI</MenuItem>
                  <MenuItem value="MN">MN</MenuItem>
                  <MenuItem value="MO">MO</MenuItem>
                  <MenuItem value="MS">MS</MenuItem>
                  <MenuItem value="MT">MT</MenuItem>
                  <MenuItem value="NC">NC</MenuItem>
                  <MenuItem value="ND">ND</MenuItem>
                  <MenuItem value="NE">NE</MenuItem>
                  <MenuItem value="NH">NH</MenuItem>
                  <MenuItem value="NJ">NJ</MenuItem>
                  <MenuItem value="NM">NM</MenuItem>
                  <MenuItem value="NV">NV</MenuItem>
                  <MenuItem value="NY">NY</MenuItem>
                  <MenuItem value="OH">OH</MenuItem>
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="OR">OR</MenuItem>
                  <MenuItem value="PA">PA</MenuItem>
                  <MenuItem value="RI">RI</MenuItem>
                  <MenuItem value="SC">SC</MenuItem>
                  <MenuItem value="SD">SD</MenuItem>
                  <MenuItem value="TN">TN</MenuItem>
                  <MenuItem value="TX">TX</MenuItem>
                  <MenuItem value="UT">UT</MenuItem>
                  <MenuItem value="VA">VA</MenuItem>
                  <MenuItem value="VT">VT</MenuItem>
                  <MenuItem value="WA">WA</MenuItem>
                  <MenuItem value="WI">WI</MenuItem>
                  <MenuItem value="WV">WV</MenuItem>
                  <MenuItem value="WY">WY</MenuItem>
                </Select>
              </div>
            )}
          </div>

          {/* <div
            style={{
              textAlign: "center",
              marginTop: 10,
              marginBottom: 5,
              fontWeight: 500,
            }}
          >
            Pay with PayPal
          </div> */}

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
                console.log(details);
                console.log(data);
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
            }}
          >
            OR
          </div>
          {/* <div style={{ textAlign: "center", fontWeight: 500 }}>
            Pay with debit
          </div> */}
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
            // onClick={(e) => this.prevent(e)}
            className="btn"
            disabled={
              this.state.processing ||
              !this.state.clientSecret ||
              !this.props.stripe
            }
          >
            {this.state.processing ? "Processing…" : "Pay with Card"}
          </button>

          <div style={{ height: 50 }}></div>
        </form>
      </div>
    );
  }

  andrewMethod2(e) {
    const first = document.getElementById("first").value.trim();
    const last = document.getElementById("last").value.trim();
    const address1 = document.getElementById("address1").value.trim();
    const address2 = document.getElementById("address2").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").textContent;

    console.log(address1);
    console.log(zip);

    localStorage.setItem("fname", first);
    localStorage.setItem("lname", last);
    localStorage.setItem("address1", address1);
    localStorage.setItem("address2", address2);
    localStorage.setItem("zip", zip);

    // const url =
    //   "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    //   address1 +
    //   "&key=" +
    //   API_KEY;

    if (!this.state.call) {
      console.log("Andrew method");
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
          console.log("THEN");
          console.log(b);
          if (b === true && first && last && address1 && zip && city && state) {
            console.log("PASSED");
            this.checkItems().then((a) => {
              console.log(a);
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

    const cart = api.getProductDetails(this.state.myData.cart);
    this.state.subTotal = cart.subTotal;
    this.state.description = cart.description;
    this.state.pictures = cart.pictures;
    this.state.tax = cart.tax;
    this.state.shipping = cart.shipping;
    this.state.total = cart.total;
    this.state.amount = cart.amount;
    this.state.currency = cart.currency;

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
    const last = document.getElementById("last").value.trim();
    const address1 = document.getElementById("address1").value.trim();
    const address2 = document.getElementById("address2").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").textContent;

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
    } else if (last === "") {
      this.setState({
        loadingIcon: false,
      });
      alert("Please enter your last name");
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
    }

    localStorage.setItem("deliverAddress", address1);
    localStorage.setItem("deliverAddress2", address2);
    localStorage.setItem("deliverCity", city);

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
              // Create our customer
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

  async checkAddress(e) {
    console.log(e);

    console.log("address");
    var address1 = document.getElementById("address1").value;
    const zip = document.getElementById("zip").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").textContent;
    console.log(state);
    console.log(city);
    console.log(address1);
    console.log(zip);
    if (address1) {
      address1 = document.getElementById("address1").value.trim();
    }
    if (!address1 || !zip || !city || state === "State") {
      return -1;
    }
    return api
      .getLatLng(address1, zip, city, state)
      .then((a) => {
        const latitude = a.results[0].geometry.location.lat;
        const longitude = a.results[0].geometry.location.lng;
        // Check that they are within delivery range

        return api
          .getLatLng(localStorage.getItem("city"))
          .then((a) => {
            const latitude2 = a.results[0].geometry.location.lat;
            const longitude2 = a.results[0].geometry.location.lng;
            // Check that they are within delivery range
            const x =
              Math.pow((latitude2 - latitude) * this.latPerMile, 2) +
              Math.pow((longitude2 - longitude) * this.lngPerMile, 2);
            const milesBetween = Math.sqrt(x);
            console.log(milesBetween);

            if (milesBetween >= 30) {
              return false;
            } else {
              return true;
            }
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
}
