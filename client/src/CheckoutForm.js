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
      cart["delivered"] = false;
      const orders = this.state.myData.orders;

      // Update my own cart and remove everything
      const newOrders = orders.concat(cart);

      var otherCartsUpdated = false;
      var allItemsRemoved = false;
      var finishedEveryItem = false;

      firebase
        .firestore()
        .collection("Users")
        .doc("aty268")
        .update({
          // cart: [],
          orders: newOrders,
        })
        .then(() => {
          console.log("My cart deleted");
          var i_index = 0;
          var b_index = 0;
          var main_index = 0;
          // Get all the item uid's
          const itemUids = [];
          for (var i = 0; i < cart.length; i++) {
            itemUids.push(cart[i].uid);
          }
          // Check that all items are still available
          for (var i = 0; i < cart.length; i++) {
            const item = cart[i];

            console.log("Entering loop");
            // Delete from item database
            firebase
              .firestore()
              .collection("Categories")
              .doc(item.category)
              .collection("All")
              .doc(item.uid)
              .get()
              .then(() => {
                i_index++;
                if (i_index == cart.length) {
                  console.log("SETTING ALL ITEMS");
                  allItemsRemoved = true;
                  if (otherCartsUpdated) {
                    alert("DONE");
                  }
                }
                console.log("Deleted item from items in database");
              })
              .catch((e) => {
                console.log(e.message);
              });

            // Find all the carts
            firebase
              .firestore()
              .collection("Users")
              .where("cart", "array-contains-any", [item])
              .get()
              .then((user) => {
                console.log("Got items in users carts");
                // Delete the items from all the users carts
                const userDocs = user.docs;
                var j_index = 0;
                if (userDocs.length === 0) {
                  b_index++;
                  console.log(i_index);
                  console.log(b_index);
                  if (i_index === cart.length && b_index == cart.length) {
                    localStorage.setItem("cart", "0");
                    console.log("FINISHED");
                    this.props.finished();
                  }
                }

                for (var j = 0; j < userDocs.length; j++) {
                  const userData = userDocs[j];

                  const id = userData.id;
                  const data = userData.data();
                  const newCart = data.cart;
                  console.log(newCart);

                  // Go through the cart and remove ALL the items
                  for (var k = 0; k < newCart.length; k++) {
                    for (var l = 0; l < itemUids.length; l++) {
                      if (newCart[k].uid === itemUids[l]) {
                        console.log("splicing array");
                        // Remove the item
                        newCart.splice(k, 1);
                      }
                    }
                  }

                  console.log(newCart);
                  firebase
                    .firestore()
                    .collection("Users")
                    .doc(id)
                    .update({
                      cart: newCart,
                    })
                    .then(() => {
                      j_index++;
                      b_index++;
                      console.log(b_index);
                      console.log(cart.length);
                      console.log("\n\n");
                      console.log(i_index);
                      console.log(cart.length);
                      console.log("\n\n");
                      console.log(j_index);
                      console.log(userDocs.length);
                      console.log("\n\n");

                      // First, we check that we are on the last cart item. b_index.
                      // Second, we make sure we have removed  all the items from the database. i_index.
                      // Third, we make sure we are on the last user cart. j_index.
                      if (
                        b_index == cart.length &&
                        i_index == cart.length &&
                        j_index == userDocs.length
                      ) {
                        console.log("FINISHED");
                        localStorage.setItem("cart", "0");
                        this.props.finished();
                      }
                      console.log("cart updated");
                    });
                }
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
            {this.state.total < 5 && (
              <div>
                Flat fee of $1.00 for shipping, no matter how many items. <br />{" "}
                <br /> <br />
                Free shipping for $5.00+ orders. <br /> <br />
                Items are typically delivered within 3 hours. <br /> <br />{" "}
                <br />
              </div>
            )}
            {this.state.total >= 5 && (
              <div>
                $5.00+ order: free shipping! <br /> <br /> Items are typically
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
    ev.preventDefault();
    const x = ev.target;
    this.checkItems().then((a) => {
      if (a) {
        this.handleSubmit(x);
      } else {
        alert(
          "Something in your cart has been purchased. You have not been charged."
        );
        window.location.reload();
      }
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
      this.state.failure
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

    api
      .createPaymentIntent({ total: this.props.total, stripe_unique_id: "xb" })
      .then((clientSecret) => {
        console.log(clientSecret);
        // this.state.clientSecret = clientSecret;
        // this.state.loaded = true;
        this.setState({
          clientSecret: clientSecret,
          loaded: true,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          error: err.message,
          failure: true,
        });
      });
  }

  async checkItems() {
    var cart = this.state.myData.cart;
    cart["delivered"] = false;
    const orders = this.state.myData.orders;

    // Check that all items are still available
    for (var i = 0; i < cart.length; i++) {
      const item = cart[i];
      return firebase
        .firestore()
        .collection("Categories")
        .doc(item.category)
        .collection("All")
        .doc(item.uid)
        .get()
        .then(() => {
          return true;
        })
        .catch((e) => {
          return false;
        });
    }
  }

  async handleSubmit(ev) {
    const API_KEY = "AIzaSyBbpHHOjcFkGJeUaEIQZ-zNVaYBw0UVfzw";

    // const first = document.getElementById("first").value.trim();
    // const last = document.getElementById("last").value.trim();
    // const address1 = document.getElementById("address1").value.trim();
    // const address2 = document.getElementById("address2").value.trim();
    // const zip = document.getElementById("zip").value.trim();
    // const city = document.getElementById("city").value.trim();
    // const state = document.getElementById("state").textContent;

    // const url =
    //   "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    //   address1 +
    //   "&key=" +
    //   API_KEY;

    // api.getLatLng(address1).then((a) => {
    //   const latitude = a.results[0].geometry.location.lat;
    //   const longitude = a.results[0].geometry.location.lng;
    //   // Check that they are within delivery range

    //   api.getLatLng(localStorage.getItem("city")).then((a) => {
    //     const latitude2 = a.results[0].geometry.location.lat;
    //     const longitude2 = a.results[0].geometry.location.lng;
    //     // Check that they are within delivery range
    //     const x =
    //       Math.pow((latitude2 - latitude) * this.latPerMile, 2) +
    //       Math.pow((longitude2 - longitude) * this.lngPerMile, 2);
    //     const milesBetween = Math.sqrt(x);
    //     console.log(milesBetween);
    //     if (milesBetween >= 15) {
    //       alert("Sorry, you are too far for delivery.");
    //       return;
    //     }
    //   });
    // });

    // return;

    // if (first === "") {
    //   alert("Please enter your first name");
    //   return;
    // } else if (last === "") {
    //   alert("Please enter your last name");
    //   return;
    // } else if (address1 === "") {
    //   alert("Please enter your address");
    //   return;
    // } else if (zip.length !== 5) {
    //   alert("Please enter a valid zip");
    //   return;
    // } else if (city === "") {
    //   alert("Please enter your city");
    //   return;
    // } else if (state === "State") {
    //   alert("Please enter your state");
    //   return;
    // }

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
      // const sellers = [];
      // for (var i = 0; i < this.state.myData.cart.length; i++) {
      //   const item = this.state.myData.cart[i];
      //   const arrItem = { id: item.seller, cost: item.original_price };
      //   sellers.push(arrItem);
      // }
      // // Pay out all the sellers
      // for (var i = 0; i < sellers.length; i++) {
      //   api
      //     .createTransfers({
      //       seller: sellers[i].id,
      //       cost: sellers[i].cost,
      //       worker: false,
      //     })
      //     .then((res) => {
      //       console.log("Res");
      //       console.log(res);
      //     })
      //     .catch((e) => {
      //       console.log("E");
      //       console.log(e.message);
      //       alert(e.message);
      //     });
      // }
      // Pay out the gig worker
      // api.createTransfers({
      //   seller: "xxx",
      //   cost: this.props.total,
      //   worker: true,
      // });

      api.createCustomer().then((e) => {
        const id = e.id;
      });
      this.setState({
        error: null,
        succeeded: true,
        processing: false,
        metadata: payload.paymentIntent,
      });

      console.log("[PaymentIntent]", payload.paymentIntent);
    }
  }
}
