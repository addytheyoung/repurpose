import React from "react";
import HeaderBar from "./HeaderBar";
import { Input } from "@material-ui/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardSection from "./CardSection";
import * as firebase from "firebase";
import CheckoutForm from "./CheckoutForm";

export default class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: ""
    };
  }
  render() {
    const signedIn = !!firebase.auth().currentUser;
    return (
      <div>
        <div
          style={{
            fontWeight: 700,
            marginTop: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 26,
            color: "#7628dd"
          }}
        >
          Collection
        </div>
        {signedIn && (
          <div style={{ width: 500, marginLeft: 20 }}>
            <CheckoutForm signedIn={true} />
          </div>
        )}
        {!signedIn && (
          <div style={{ width: 500, marginLeft: 20 }}>
            <CheckoutForm signedIn={false} />
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10
          }}
        ></div>
      </div>
    );
  }

  updateCardNumber(e) {
    console.log(e);
  }
}
