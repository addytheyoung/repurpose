import React, { Component } from "react";
import "../css/SellMobile.css";
import Clock from "../images/clock.svg";
import Money from "../images/money.svg";
import Delivery from "../images/delivery.svg";
import Treasure from "../images/treasureGIMP.png";

export default class SellMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="sell-mobile-main">
        <div
          onClick={() => (window.location.href = "/")}
          id="bar"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontFamily: "Pridi",
              fontWeight: 700,
              marginLeft: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
              color: "#426CB4",
            }}
          >
            Tate's
          </div>
          <div
            style={{
              fontFamily: "Pridi",
              fontWeight: 700,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
              color: "#AF7366",
              marginLeft: 5,
            }}
          >
            Crate
          </div>
          <img
            style={{ width: 50, height: 50, marginLeft: 20 }}
            src={Treasure}
          ></img>
        </div>
        <div className="sell-mobile-1">Sell your clutter with Tate's Crate</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {" "}
          <div className="mobile-call">Call to get started:</div>
          <div className="mobile-phone">903-203-1286</div>
        </div>
        <div
          style={{
            marginTop: "4vh",
            marginBottom: "2vh",
            fontWeight: 600,
            textAlign: "center",
            fontSize: 24,
          }}
        >
          How it works
        </div>

        <div className="sell-img-container">
          <div className="sell-img-title">Choose a time you're free</div>
          <img src={Clock} className="sell-img" />
        </div>
        <div className="sell-img-container">
          <div className="sell-img-title">
            We send a truck to pick everything up
          </div>
          <img src={Delivery} className="sell-img" />
        </div>
        <div className="sell-img-container">
          <div className="sell-img-title">
            We price each item, and pay YOU when they sell
          </div>
          <img src={Money} className="sell-img" />
        </div>
        <div className="sell-faq-title">FAQ</div>

        <div className="sell-faq-container">
          <div className="sell-faq-question">
            Q: How much do you pay the seller?
          </div>
          <div className="sell-faq-answer">
            A: We pay 40% commission to the seller, once the items are sold.
          </div>
        </div>
        <div className="sell-faq-container">
          <div className="sell-faq-question">
            Q: How long do you keep the items?
          </div>
          <div className="sell-faq-answer">
            A: We keep the items for 2 months. After that time, you're free to
            keep them listed, come and pick them up, or donate them!
          </div>
        </div>
        <div className="sell-faq-container">
          <div className="sell-faq-question">Q: How / When do I get paid?</div>
          <div className="sell-faq-answer">
            A: Every two weeks, we can either send you a physical check, or send
            money to your Paypal account.
          </div>
        </div>
        <div className="sell-faq-container">
          <div className="sell-faq-question">
            Q: How do I know what's listed / what's sold?
          </div>
          <div className="sell-faq-answer">
            A: We'll send you a page where you can see what has been listed, how
            much it was listed for, and what has sold.
          </div>
        </div>
        <div className="sell-faq-container">
          <div className="sell-faq-question">
            Q: Can I still use you if I only have a few items?
          </div>
          <div className="sell-faq-answer">
            A: We charge $15 to pickup the items, so you can if the fee is worth
            it for you, but keep in mind we won't pick up anything we can't
            resell!
          </div>
        </div>
        <div className="sell-faq-container">
          <div className="sell-faq-question">
            Q: Will you pick up trash or broken items?
          </div>
          <div className="sell-faq-answer">
            A: No, we only take items that we think can be resold.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {" "}
          <div className="mobile-call">Call to get started:</div>
          <div className="mobile-phone">903-203-1286</div>
        </div>
      </div>
    );
  }
}
