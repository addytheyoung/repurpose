import React, { useEffect, useState } from "react";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
      console.log(cart);
      cart["delivered"] = false;
      const orders = this.state.myData.orders;

      // Update my own cart and remove everything
      const newOrders = orders.concat(cart);

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
          customer_id: this.state.customer_id,
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
              .update({ deleting_now: true })
              .then(() => {
                firebase
                  .firestore()
                  .collection("Categories")
                  .doc(item.category)
                  .collection("All")
                  .doc(item.uid)
                  .get()
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
                            console.log(newCart);
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
                                  this.props.finished();
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
        {this.props.deliveryType === "delivery" && (
          <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 500 }}>
            {this.state.total < 6 && (
              <div>
                Flat fee of $2.00 for shipping, no matter how many items. <br />{" "}
                <br />
                Free shipping for $6.00+ orders. <br /> <br />
                Items are typically delivered within 3 hours. <br /> <br />{" "}
                <br />
              </div>
            )}
            {this.state.total >= 6 && (
              <div>
                $6.00+ order: free shipping! <br /> <br /> Items are typically
                delivered within 3 hours. <br /> <br />{" "}
              </div>
            )}
          </div>
        )}
        {this.props.deliveryType === "pickup" && (
          <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 500 }}>
            Pickup location is 2414 Longview Street, <br />
            Athens TX. We'll send you an email to confirm.
          </div>
        )}
        <form
          onSubmit={(ev) => this.andrewMethod(ev)}
          style={{ paddingLeft: 0, minWidth: 400, maxWidth: 600 }}
        >
          <div className="sr-combo-inputs">
            <div className="sr-combo-inputs-row" style={{ width: 400 }}>
              <CardElement
                className="sr-input sr-card-element"
                options={options}
              />
            </div>
          </div>

          {this.state.error && (
            <div className="message sr-field-error">{this.state.error}</div>
          )}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              id="first"
              style={{ margin: 10 }}
              placeholder="First Name"
            ></Input>
            <Input
              id="last"
              style={{ margin: 10 }}
              placeholder="Last Name"
            ></Input>
            {this.props.deliveryType === "delivery" && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Input
                  id="address1"
                  style={{ margin: 10 }}
                  placeholder="Address Line 1"
                ></Input>
                <Input
                  id="address2"
                  style={{ margin: 10 }}
                  placeholder="Address Line 2 (optional)"
                ></Input>
                <Input
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

            <button
              id="pay"
              style={{
                backgroundColor: "#a1a1a1",
                height: 40,
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
              {this.state.processing ? "Processing…" : "Pay"}
            </button>
            <div style={{ height: 50 }}></div>
          </div>
        </form>
      </div>
    );
  }

  andrewMethod(ev) {
    console.log("Andrew method");
    var myUid = null;

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
            const y = x;
            if (a.length === this.state.myData.cart.length) {
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
          alert("Please enter your address");
        } else {
          alert("Sorry, you are too far for delivery. We'll have pickup soon!");
        }
      })
      .catch((e) => {
        console.log(e.message);
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
      total += 2;
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
    var cart = this.state.myData.cart;
    cart["delivered"] = false;
    const orders = this.state.myData.orders;

    // Check that all items are still available
    var index = 0;
    for (var i = 0; i < cart.length; i++) {
      const item = cart[i];
      const itemsInDb = [];
      return firebase
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

          if (index === cart.length) {
            return itemsInDb;
          }
        })
        .catch((e) => {
          return false;
        });
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
      alert("Please enter your first name");
      return;
    } else if (last === "") {
      alert("Please enter your last name");
      return;
    } else if (address1 === "") {
      alert("Please enter your address");
      return;
    } else if (zip.length !== 5) {
      alert("Please enter a valid zip");
      return;
    } else if (city === "") {
      alert("Please enter your city");
      return;
    } else if (state === "State") {
      alert("Please enter your state");
      return;
    }

    this.state.processing = true;
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
        error: `Payment failed: ${payload.error.message}`,
        processing: false,
      });

      console.log("[error]", payload.error);
    } else {
      // Create our customer
      const sellers = [];
      for (var i = 0; i < this.state.myData.cart.length; i++) {
        const item = this.state.myData.cart[i];
        const arrItem = { id: item.seller, cost: item.original_price };
        sellers.push(arrItem);
      }
      // Pay out all the sellers
      var i_index = 0;
      for (var i = 0; i < sellers.length; i++) {
        api
          .createTransfers({
            seller: sellers[i].id,
            cost: sellers[i].cost,
            worker: false,
          })
          .then((res) => {
            i_index++;
            if (i_index == sellers.length) {
              api.createCustomer().then((e) => {
                console.log(e);
                const id = e.id;
                this.setState({
                  error: null,
                  succeeded: true,
                  processing: false,
                  metadata: payload.paymentIntent,
                  customer_id: id,
                });
              });
            }
            console.log(res);
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
      //Pay out the gig worker
      // api.createTransfers({
      //   seller: "xxx",
      //   cost: this.props.total,
      //   worker: true,
      // });

      console.log("[PaymentIntent]", payload.paymentIntent);
    }
  }

  async checkAddress() {
    console.log("address");
    var address1 = document.getElementById("address1").value;
    const zip = document.getElementById("zip").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").textContent;
    console.log(state);
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

            if (milesBetween >= 15) {
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
