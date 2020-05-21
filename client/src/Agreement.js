import React from "react";
import Down from "./images/down-arrow.png";
import Up from "./images/up-arrow.png";
import HeaderBar from "./HeaderBar";
import Close from "./images/close.png";
import { Input } from "@material-ui/core";
import "./css/Agreement.css";

export default class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: false,
      paypalModal: false,
    };
  }
  render() {
    return (
      <div>
        {this.state.paypalModal && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center"
            }}
          >
            <div
              onClick={(e) => this.closeModal(e)}
              style={{
                backgroundColor: "#000000",
                opacity: 0.5,
                zIndex: 99,
                width: "100vw",
                height: "100vh",
                position: "absolute",
              }}
            ></div>
            <div
              style={{
                width: "50vw",
                borderRadius: 5,
                height: "80vh",
                top: 30,
                backgroundColor: "#f5f5f5",
                position: "absolute",
                zIndex: 100,
                opacity: 1,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    id="close"
                    onClick={() => this.closeModal()}
                    src={Close}
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 20,
                      marginRight: 20,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 20,
                    fontWeight: 600,
                    marginTop: 10,
                  }}
                >
                  Email, phone, OR username for Paypal account
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 12,
                    fontWeight: 400,
                    marginTop: 10,
                  }}
                >
                  This is so we can pay you. <br />
                  Make sure you make an account on paypal.com if you don't have
                  one.
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Input
                    id="paypal-id"
                    placeholder="Email, Phone, or Username"
                    style={{ width: 400, marginTop: 20 }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    onClick={() => this.paypalSignup()}
                    id="header-checkout"
                    style={{
                      display: "flex",
                      width: 150,
                      marginTop: 30,
                      textDecoration: "none",
                      backgroundColor: "#0072b1",
                      borderRadius: 5,
                      padding: 10,
                      height: 20,
                      fontWeight: 600,
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 150,
                    }}
                  >
                    GET STARTED
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <HeaderBar />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 22 }}></div>
          <div>
            <div>
              <div
                id="three"
                onClick={() =>
                  this.setState({
                    three: !this.state.three,
                  })
                }
                style={{ marginTop: 20, fontWeight: 500, fontSize: 18 }}
              >
                On your scheduled time, make sure we can get to the items.
                <img
                  style={{ marginLeft: 10, width: 20, height: 20 }}
                  src={Down}
                ></img>
              </div>

              {this.state.three && (
                <div style={{ marginTop: 10, fontSize: 18, marginLeft: 30 }}>
                  Option 1: Leave the items where we can easily pick them up.
                </div>
              )}
              {this.state.three && (
                <div style={{ fontSize: 18, marginTop: 5, marginLeft: 30 }}>
                  Option 2: Be present, and lead the collector to the items.
                </div>
              )}
            </div>
          </div>
          <div style={{ marginTop: 40, fontSize: 20, fontWeight: 500 }}>
            How do you want to be paid?
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              onClick={() => this.mailedACheck()}
              id="header-checkout"
              style={{
                display: "flex",
                marginTop: 40,
                marginLeft: 10,
                marginRight: 10,
                width: 160,
                textAlign: "center",
                textDecoration: "none",
                borderRadius: 5,
                padding: 10,
                height: 20,
                fontWeight: 600,
                color: "white",
                alignItems: "center",
                backgroundColor: "#006a4e",
                justifyContent: "center",
                minWidth: 150,
              }}
            >
              Mailed a check
            </div>
            <div
              onClick={() => this.paypal()}
              id="header-checkout"
              style={{
                display: "flex",
                marginTop: 40,
                marginLeft: 10,
                marginRight: 10,
                width: 160,
                textAlign: "center",
                textDecoration: "none",
                borderRadius: 5,
                padding: 10,
                height: 20,
                fontWeight: 600,
                color: "white",
                alignItems: "center",
                backgroundColor: "#0072b1",
                justifyContent: "center",
                minWidth: 150,
              }}
            >
              Paypal
            </div>
            <div
              onClick={() => this.stripeSignup()}
              id="header-checkout"
              style={{
                display: "flex",
                marginTop: 40,
                marginLeft: 10,
                marginRight: 10,
                width: 160,
                textAlign: "center",
                textDecoration: "none",
                borderRadius: 5,
                padding: 10,
                height: 20,
                fontWeight: 600,
                color: "white",
                alignItems: "center",
                backgroundColor: "#A0522D",
                justifyContent: "center",
                minWidth: 150,
              }}
            >
              Bank deposit (Longer)
            </div>
          </div>
        </div>
      </div>
    );
  }

  mailedACheck() {
    window.location.href = "/sell/getkit" + "/?id=mailed";
    return;
  }

  paypal() {
    this.setState({
      paypalModal: true,
    });
    return;
  }

  paypalSignup() {
    const id = document.getElementById("paypal-id").value;
    localStorage.setItem("stripe_user_id", id);
    localStorage.setItem("sell_type", "paypal");
    if (!id || id.trim() == "") {
      return;
    } else {
      window.location.href = "/sell/getkit" + "/?id=paypal";
      return;
    }
  }

  stripeSignup() {
    // Take us to the stripe redirect
    var test_api_key = "ca_GziEvM247byG5XcbBDVdmFHV5l3vPz4h";
    var api_key = "ca_GziEZt1B1Xc8KxBLn5xsbZH0JkVmMMbb";

    var test = false;

    if (test) {
      var stripe_url = "";
      if (window.location.href.includes("localhost")) {
        stripe_url =
          "https://connect.stripe.com/express/oauth/authorize?client_id=ca_GziEvM247byG5XcbBDVdmFHV5l3vPz4h&stripe_user%5Bproduct_description%5D=I am selling my own items to Collection.&stripe_user%5Bbusiness_type%5D=individual&redirect_uri=http://localhost:3000/sell/getkit";
      } else {
        stripe_url =
          "https://connect.stripe.com/express/oauth/authorize?client_id=ca_GziEvM247byG5XcbBDVdmFHV5l3vPz4h&stripe_user%5Bproduct_description%5D=I am selling my own items to Collection.&stripe_user%5Bbusiness_type%5D=individual&redirect_uri=https://collection.deals/sell/getkit";
      }

      window.location.href = stripe_url;
    } else {
      var stripe_url = "";

      stripe_url =
        "https://connect.stripe.com/express/oauth/authorize?client_id=ca_GziEZt1B1Xc8KxBLn5xsbZH0JkVmMMbb&stripe_user%5Bproduct_description%5D=I am selling my own items to Collection.&stripe_user%5Bbusiness_type%5D=individual&redirect_uri=https://collection.deals/sell/getkit";

      window.location.href = stripe_url;
    }
  }

  closeModal(e) {
    // e.stopPropagation();
    this.setState({
      paypalModal: null,
    });
  }
}
