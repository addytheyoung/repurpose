import React from "react";
import HeaderBar from "./HeaderBar";
import { Input } from "@material-ui/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardSection from "./CardSection";
import CheckoutForm from "./CheckoutForm";

export default class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: ""
    };
  }
  render() {
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
        <div style={{ width: 500 }}>
          <CheckoutForm />
        </div>

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
