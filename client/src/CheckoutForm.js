import React, { useEffect, useState } from "react";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./css/CheckoutForm.css";
import * as firebase from "firebase";
import api from "./api";
import ClipLoader from "react-spinners/ClipLoader";

export default class CheckoutForm extends React.Component {
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
      myData: null
    };
  }

  render() {
    const options = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      }
    };
    if (this.state.succeeded) {
      return (
        <div className="sr-field-success message">
          <h1>Your test payment succeeded</h1>
          <p>View PaymentIntent response:</p>
          <pre className="sr-callout">
            <code>{JSON.stringify(this.state.metadata, null, 2)}</code>
          </pre>
        </div>
      );
    }
    if (this.state.succeeded) {
      return (
        <div className="checkout-form">
          <div className="sr-payment-form">
            <div className="sr-form-row" />
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={ev => this.handleSubmit(ev)}>
        <h1>
          {this.state.currency.toLocaleUpperCase()}{" "}
          {this.state.amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2
          })}
        </h1>
        <h4>Pre-order the Pasha package</h4>

        <div className="sr-combo-inputs">
          <div className="sr-combo-inputs-row">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="cardholder"
              className="sr-input"
            />
          </div>

          <div className="sr-combo-inputs-row">
            <CardElement
              className="sr-input sr-card-element"
              options={options}
            />
          </div>
        </div>

        {this.state.error && (
          <div className="message sr-field-error">{this.state.error}</div>
        )}

        <button
          // onClick={(e) => this.prevent(e)}
          className="btn"
          disabled={
            this.state.processing ||
            !this.state.clientSecret ||
            !this.props.stripe
          }
        >
          {this.state.processing ? "Processing…" : "Paay"}
        </button>
      </form>
    );
  }

  componentDidMount() {
    console.log(this.state.succeeded);
    console.log(this.state.processing);
    if (this.state.processing || this.state.succeeded) {
      return null;
    }
    console.log("mounting");
    // Step 1: Fetch product details such as amount and currency from
    // API to make sure it can't be tampered with in the client.
    api.getProductDetails().then(productDetails => {
      this.state.amount = productDetails.amount / 100;
      this.state.currency = productDetails.currency;
      // this.setState({
      //   amount: productDetails.amount / 100,
      //   currency: productDetails.currency,
      //   description: productDetails.description,
      //   email: productDetails.email,
      //   address: productDetails.address
      // });
    });

    // Step 2: Create PaymentIntent over Stripe API
    api
      .createPaymentIntent({
        payment_method_types: ["card"]
      })
      .then(clientSecret => {
        this.setState({
          clientSecret: clientSecret
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    this.state.processing = true;

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    const payload = await this.props.stripe.confirmCardPayment(
      this.state.clientSecret,
      {
        payment_method: {
          card: this.props.elements.getElement(CardElement),
          billing_details: {
            name: ev.target.name.value
          }
        }
      }
    );

    if (payload.error) {
      this.setState({
        error: `Payment failed: ${payload.error.message}`,
        processing: false
      });

      console.log("[error]", payload.error);
    } else {
      // Create our customer!
      api.createCustomer().then(e => {
        const id = e.id;
      });
      this.setState({
        error: null,
        succeeded: true,
        processing: false,
        metadata: payload.paymentIntent
      });

      console.log("[PaymentIntent]", payload.paymentIntent);
    }
  }
}
