import React, { useEffect, useState } from "react";
import {
  CardElement,
  ElementsConsumer,
  useElements,
} from "@stripe/react-stripe-js";
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
import { result, add } from "lodash";
import Visa from "./images/visa.jpg";
import MasterCard from "./images/mastercard.png";
import AmericanExpress from "./images/americanexpress.png";
import Discover from "./images/discover.png";
import QuestionMark from "./images/question-mark.png";
import Tick from "./images/tick.png";

export default class CheckoutForm extends React.Component {
  lngPerMile = 57;
  latPerMile = 69;

  constructor(props) {
    super(props);
    this.state = {
      currency: "",
      description: "",
      clientSecret: null,
      error: null,
      metadata: null,
      succeeded: false,
      processing: false,
      loaded: false,
      myData: this.props.myData,
      finished: false,
      timesCalledStripe: 0,
      address1: "",
      address2: "",
      email: this.props.myData ? this.props.myData.email : "",
      activePaymentData: null,
      paymentTypeModal: false,
    };
    this.findData();
  }

  render() {
    if (!this.state.loaded) {
      return <div>SDFSDF</div>;
    }
    // Get our parameters
    const q = window.location.search;
    const urlParams = new URLSearchParams(q);

    // Cancelled. Just the token.
    if (urlParams.get("token")) {
      alert("Paypal Transacton cancelled");
      window.history.replaceState(null, null, "/");
    } else if (urlParams.get("success")) {
      this.handlePaypalResponse();
    }

    const { activePaymentData } = this.state;

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

    // Did we succeed?
    if (this.state.succeeded) {
      this.finishMethod();

      return null;
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
          // alignItems: "center",
        }}
      >
        {this.state.loadingIcon && (
          <div>
            <LoadingPage />
          </div>
        )}
        <div
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
              addressValue={this.state.address1}
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

          {this.state.paymentTypeModal && (
            <div>
              {this.state.myData.card_tokens.map((item, index) => {
                return (
                  <div
                    id="active-payment-data"
                    style={{
                      borderTopWidth: 1,
                      borderTopStyle: "solid",
                      borderBottomWidth: 1,
                      padding: 10,
                      display: "flex",
                      flexDirection: "row",
                      borderColor: "lightgrey",
                      alignItems: "center",
                    }}
                    onClick={() => this.selectPaymentToken(item, index)}
                  >
                    {item.brand == "Visa" && (
                      <img style={{ width: 40, height: 25 }} src={Visa}></img>
                    )}
                    {item.brand == "MasterCard" && (
                      <img
                        style={{ width: 40, height: 25 }}
                        src={MasterCard}
                      ></img>
                    )}
                    {item.brand == "American Express" && (
                      <img
                        style={{ width: 40, height: 25 }}
                        src={AmericanExpress}
                      ></img>
                    )}
                    {item.brand == "Discover" && (
                      <img
                        style={{ width: 40, height: 40 }}
                        src={Discover}
                      ></img>
                    )}

                    {item.brand != "Visa" &&
                      item.brand != "MasterCard" &&
                      item.brand != "American Express" &&
                      item.brand != "Discover" && (
                        <img
                          style={{
                            width: 25,
                            height: 25,
                            marginLeft: 8,
                            marginRight: 0,
                          }}
                          src={QuestionMark}
                        ></img>
                      )}
                    <div
                      style={{
                        fontFamily: "Gill Sans",
                        fontSize: 8,
                        marginLeft: 10,
                        marginRight: 2,
                        fontWeight: "800",
                      }}
                    >
                      ****
                    </div>
                    <div>{activePaymentData.last4}</div>
                    {index == 0 && (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          marginRight: 10,
                        }}
                      >
                        <img src={Tick} style={{ width: 12, height: 12 }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activePaymentData && !this.state.paymentTypeModal && (
            <div
              id="active-payment-data"
              style={{
                borderTopWidth: 1,
                borderTopStyle: "solid",
                borderBottomWidth: 1,
                padding: 10,
                display: "flex",
                flexDirection: "row",
                borderColor: "lightgrey",
                alignItems: "center",
              }}
              onClick={() => this.openPaymentModal()}
            >
              {activePaymentData.brand == "Visa" && (
                <img style={{ width: 40, height: 25 }} src={Visa}></img>
              )}
              {activePaymentData.brand == "MasterCard" && (
                <img style={{ width: 40, height: 25 }} src={MasterCard}></img>
              )}
              {activePaymentData.brand == "American Express" && (
                <img
                  style={{ width: 40, height: 25 }}
                  src={AmericanExpress}
                ></img>
              )}
              {activePaymentData.brand == "Discover" && (
                <img style={{ width: 40, height: 40 }} src={Discover}></img>
              )}

              {activePaymentData.brand != "Visa" &&
                activePaymentData.brand != "MasterCard" &&
                activePaymentData.brand != "American Express" &&
                activePaymentData.brand != "Discover" && (
                  <img
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: 8,
                      marginRight: 0,
                    }}
                    src={QuestionMark}
                  ></img>
                )}
              <div
                style={{
                  fontFamily: "Gill Sans",
                  fontSize: 8,
                  marginLeft: 10,
                  marginRight: 2,
                  fontWeight: "800",
                }}
              >
                ****
              </div>
              <div>{activePaymentData.last4}</div>
            </div>
          )}

          {activePaymentData && (
            <div
              onClick={() => this.confirmPurchase()}
              id="pay"
              style={{
                backgroundColor: "#05A357",
                marginTop: 20,
                height: 60,
                width: "100%",
                borderRadius: 5,
                borderWidth: 0,
                color: "white",
                fontWeight: 600,
                fontSize: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="btn"
            >
              Confirm Purchase
            </div>
          )}

          <div className="sr-combo-inputs" style={{ minWidth: 400 }}>
            <div className="sr-combo-inputs-row">
              <CardElement
                id="card-element"
                className="sr-input sr-card-element"
                options={options}
              />
            </div>
          </div>

          <div
            onClick={() => this.payWithCard()}
            id="pay"
            style={{
              // backgroundColor: "#426CB4",
              backgroundColor: "#000000",
              height: 60,
              width: "100%",
              borderRadius: 5,
              borderWidth: 0,
              color: "white",
              fontWeight: 600,
              fontSize: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="btn"
            // disabled={
            //   this.state.processing ||
            //   !this.state.clientSecret ||
            //   !this.props.stripe
            // }
          >
            {this.state.processing ? "Processing…" : "Add Card"}
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

          <form
            id="paypal-form"
            on
            action="http://localhost:4242/paypal"
            method="POST"
          >
            <div
              id="paypal-button"
              onClick={() => this.payWithPaypal()}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 5,
                backgroundColor: "#ffc439",
                height: 60,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: 0,
                outline: "none",
              }}
            >
              <img src={PayPal} style={{ width: 100, height: 100 }} />
            </div>
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
          </form>

          <div style={{ height: 50 }}></div>
        </div>
      </div>
    );
  }

  async selectPaymentToken(cardToken, index, paymentTokens) {
    if (index == 0) {
      alert("That payment method is already selected!");
      return;
    }
    console.log(cardToken);
    const customerId = cardToken.customer;
    const cardTokenId = cardToken.id;

    // Update the back end main payment method
    const result = await api.updateCustomerCard(customerId, cardTokenId);

    console.log(result);
    console.log("result sources", result.sources);

    firebase
      .firestore()
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        card_tokens: result.sources.data,
      })
      .then(() => {
        this.findData();
        this.setState({
          paymentTypeModal: false,
        });
      })
      .catch((e) => {
        alert(e.message);
      });
    return;
  }

  openPaymentModal() {
    if (this.state.myData.card_tokens.length == 1) {
      alert("This is your only payment method! Add another to change it.");
      return;
    }
    this.setState({
      paymentTypeModal: true,
    });
  }

  // Confirm purchase with a previous token
  async confirmPurchase() {
    // 0) Get all the info
    const address1 = this.state.address1;
    const address2 = this.state.address2;
    const email = this.state.email.trim().toLowerCase();
    const myUid = firebase.auth().currentUser.uid;
    const myProfileData = this.state.myData;
    const customerId = myProfileData.customer_id;

    // 1) Update users address
    if (!this.checkAddress(address1) || !checkEmail(email)) {
      return;
    }

    if (firebase.auth().currentUser) {
      firebase.firestore().collection("Users").doc(myUid).update({
        address1: address1,
        address2: address2,
      });
    }
    console.log(myProfileData);
    if (!customerId) {
      alert("Not a customer");
      return;
    }

    // 2) Check if items are still valid. Remove if not.
    const itemResult = await this.checkItems();
    if (itemResult.length != myProfileData.cart.length) {
      alert(
        "Something in your cart has been purchased. you have not been charged."
      );
      await firebase
        .firestore()
        .collection("Users")
        .doc(myUid)
        .update({
          cart: itemResult,
        })
        .then(() => {
          this.props.navigation.goBack();
        });
      return;
    }

    // 3) Charge the customer
    const result = await api.chargeCustomer(this.props.total, customerId);
    if (result.code) {
      // Failed. Alert the code
      alert("Card declined. Please try again.");
      return;
    } else {
      console.log("charged customer");
      console.log(result);
    }
    // 3) Email a reciept
    const cart = myProfileData.cart;
    var emailText =
      "Thank you for your purchase!\n\nYou purchased: " +
      cart.length +
      " items for $" +
      this.props.total +
      ". " +
      "\n\nItems will be delivered to " +
      this.state.address1 +
      ", " +
      this.state.address2 +
      " the next morning!" +
      "\n\n";

    if (result.receipt_url) {
      emailText += "View your reciept here: " + result.receipt_url;
    }

    api.sendEmail(email, emailText);
    api.sendEmail("andrew@collection.deals", emailText);

    // 4) Remove the items purchased from the shop, and update users cart
    //await this.deleteItemsAndRemoveFromCart(result);

    // 5) Take user to confirmation screen.
    this.props.finished();
    this.setState({
      paymentComplete: true,
      paymentDetails: result,
      succeeded: true,
    });
  }

  // Create or update a stripe customer
  async createOrUpdateStripeCustomer(cardToken) {
    console.log("create or update");
    // See if we are a customer.
    const myProfileData = this.state.myData;
    const uid = firebase.auth().currentUser.uid;
    var customer_id = myProfileData.customer_id;
    const myCardTokens = myProfileData.card_tokens
      ? myProfileData.card_tokens
      : [];
    const email = myProfileData.email;
    if (!customer_id) {
      // 0) Create a stripe customer
      const result0 = await api.createCustomer(email);

      if (result0.code) {
        alert("Card Declined. Please try agiain");
        return;
      }
      customer_id = result0.id;
      await firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .update({
          customer_id: result0.id,
          card_tokens: [],
        })
        .then(() => {
          console.log("Result, no id");
          console.log(result0);
        })
        .catch((e) => {
          alert(e.message);
          console.log(e.message);
        });
    }
    console.log("waiting on create customer card");
    // 1) Add the token to our stripe customer
    console.log(customer_id, customer_id);
    console.log("cardToken", cardToken.id);
    const result1 = await api.createCustomerCard(customer_id, cardToken.id);

    if (result1.code) {
      // Failed. Alert the code
      console.log(result1);
      alert("Card declined. Please try again.");
      return;
    } else {
      console.log("Card created");
      console.log(result1);
    }

    // 2) Set the new card as the default payment method
    const result2 = await api.updateCustomerCard(customer_id, result1.id);
    if (result2.code) {
      // Failed. Alert the code
      if (result2.decline_code == "insufficient_funds") {
        console.log(result2.code);
        alert("Card declined, insufficient funds. Please try again.");
        return;
      }
      console.log(result2.code);
      alert("Card declined. Please try again.");
      return;
    } else {
      console.log("Card created");
      console.log("result", result2);
    }

    // 3) Update card_tokens and reload
    myCardTokens.splice(0, 0, result1);
    await firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .update({
        card_tokens: myCardTokens,
      })
      .then(() => {
        console.log(myCardTokens);
        this.findData();
      });
  }

  async findData() {
    const myUid = firebase.auth().currentUser.uid;
    console.log("find profile");
    firebase
      .firestore()
      .collection("Users")
      .doc(myUid)
      .get()
      .then((snapshot) => {
        const myData = snapshot.data();
        this.setState({
          myData: myData,
          loaded: true,
          emailInput: myData.email ? myData.email : "",
          address1: myData.address1 ? myData.address1 : "",
          changedAddress: myData.address1 ? false : true,
          address2: myData.address2 ? myData.address2 : "",
          savedCardTokens: myData.savedCardTokens ? myData.savedCardTokens : [],
          activePaymentData:
            myData.card_tokens && myData.card_tokens.length > 0
              ? myData.card_tokens[0]
              : null,
        });
      });
  }

  // Pay with or add a card
  async payWithCard() {
    // 1) Get all the info
    const address1 = this.state.address1;
    const address2 = this.state.address2;
    const email = this.state.email.trim().toLowerCase();
    // if (!this.checkAddress(address1) || !checkEmail(email)) {
    //   return;
    // }

    // // 2) Update users address info
    // if (firebase.auth().currentUser) {
    //   firebase
    //     .firestore()
    //     .collection("Users")
    //     .doc(firebase.auth().currentUser.uid)
    //     .update({
    //       address1: address1,
    //       address2: address2,
    //     });
    // }

    // 3) Get the token from this card

    const cardElement = this.props.elements.getElement(CardElement);

    const token = await this.props.stripe.createToken(cardElement);

    if (token.code) {
      alert("Card declined. Please try again.");
      return;
    } else {
      console.log("token create");
      console.log(token.token);
    }

    // 4) Create or update our stripe customer
    await this.createOrUpdateStripeCustomer(token.token);
  }

  // If we're done, call this!
  async finishMethod(result) {
    const email = this.state.email.trim().toLowerCase();

    // 1) Remove items from carts properly
    // await this.deleteItemsAndRemoveFromCart()

    // 2) Send the email reciept
    var cart = this.state.myData.cart;
    var tempCart = JSON.parse(JSON.stringify(this.state.myData.cart));

    var emailText =
      "Thank you for your purchase!\n\nYou purchased: " +
      cart.length +
      " items for $" +
      this.props.total +
      ". " +
      "\n\nItems will be delivered to " +
      this.state.address1 +
      ", " +
      this.state.address2 +
      " the next morning!" +
      "\n\n" +
      "Call 903-203-1286 if you have any issues or concerns.";

    if (result && result.receipt_url) {
      emailText += "View your reciept here: " + result.receipt_url;
    }

    api.sendEmail(email, emailText);
    api.sendEmail("andrew@collection.deals", emailText);

    // 3) Call finish prop
  }

  // Delete items from my and other users carts, and remove it from our database
  async deleteItemsAndRemoveFromCart() {
    const cart = this.state.myProfileData.cart;
    var tempCart = JSON.parse(JSON.stringify(cart));

    for (var i = 0; i < tempCart.length; i++) {
      tempCart[i]["address"] = this.state.address1;
      tempCart[i]["address2"] = this.state.address2;
    }

    // Update my own cart and remove everything
    const orders = this.state.myData.orders;
    var newOrders = orders.concat(tempCart);

    // Get myuid
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

          // Delete all items from database
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
                                    console.log("DONE WITH REMOVAL!!!!*****");
                                  })
                                  .catch((e) => {
                                    console.log(e);
                                    alert(e.message);
                                  });
                              }
                            })
                            .catch((e) => {
                              console.log(e);
                              alert(e.message);
                            });
                        }
                      })
                      .catch((e) => {
                        console.log(e);
                        alert(e.message);
                      });
                  }
                })
                .catch((e) => {
                  console.log(e);
                  alert(e.message);
                });
            })
            .catch((e) => {
              console.log(e);
              alert(e.message);
            });
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
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

    // 1) Update the users address (If they are one)
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

    // 2) Check if the items are still valid
    const itemResult = await this.checkItems();
    if (itemResult.length != this.state.myData.cart.length) {
      alert(
        "Something in your cart has been purchased. you have not been charged."
      );
      await firebase
        .firestore()
        .collection("Users")
        .doc(myUid)
        .update({
          cart: itemResult,
        })
        .then(() => {
          window.location.reload();
        });
      return;
    }

    // 3) Submit the form
    form.submit();
  }

  checkAddress() {
    const address = this.state.address1;
    if (!address || address == "") {
      alert("Please input an address!");
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    // if (
    //   this.state.processing ||
    //   this.state.succeeded ||
    //   this.state.clientSecret ||
    //   this.state.timesCalledStripe > 3
    // ) {
    //   return null;
    // }
    // // Step 1: Fetch product details such as amount and currency from
    // // API to make sure it can't be tampered with in the client.
    // // const cart = api.getProductDetails(this.state.myData.cart);
    // // this.state.subTotal = cart.subTotal;
    // // this.state.description = cart.description;
    // // this.state.pictures = cart.pictures;
    // // this.state.tax = cart.tax;
    // // this.state.shipping = cart.shipping;
    // // this.state.total = cart.total;
    // // this.state.amount = cart.amount;
    // // this.state.currency = cart.currency;
    // console.log("GOT PRODUCT DETAILS");
    // // Step 2: Create PaymentIntent over Stripe API
    // // Total is fucked up?
    // console.log(this.props.total);
    // api
    //   .createPaymentIntent({ total: this.props.total, stripe_unique_id: "xb" })
    //   .then((clientSecret) => {
    //     console.log(clientSecret);
    //     // this.state.clientSecret = clientSecret;
    //     // this.state.loaded = true;
    //     this.setState({
    //       clientSecret: clientSecret,
    //       loaded: true,
    //       timesCalledStripe: this.state.timesCalledStripe + 1,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     this.setState({
    //       error: err.message,
    //       timesCalledStripe: this.state.timesCalledStripe + 1,
    //     });
    //   });
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

  getActivePaymentData() {
    const cardTokens = this.state.myData.card_tokens;
    if (!cardTokens || cardTokens.length == 0) {
      return null;
    } else {
      return cardTokens[0];
    }
  }
}
