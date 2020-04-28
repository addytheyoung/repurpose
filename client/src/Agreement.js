import React from "react";
import Down from "./images/down-arrow.png";
import Up from "./images/up-arrow.png";
import HeaderBar from "./HeaderBar";
import "./css/Agreement.css";

export default class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: false,
    };
  }
  render() {
    return (
      <div>
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
          <div style={{ fontWeight: 600, fontSize: 22 }}>Some rules</div>
          <div>
            <div>
              <div
                id="one"
                onClick={() =>
                  this.setState({
                    one: !this.state.one,
                  })
                }
                style={{
                  marginTop: 40,
                  fontWeight: 500,
                  fontSize: 18,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                1. We don't take very broken items or trash.
                <img
                  style={{ marginLeft: 10, width: 20, height: 20 }}
                  src={Down}
                ></img>
              </div>
              {this.state.one && (
                <div style={{ marginTop: 10, fontSize: 18, marginLeft: 30 }}>
                  A toy with some pieces missing IS good.
                </div>
              )}
              {this.state.one && (
                <div style={{ fontSize: 18, marginTop: 5, marginLeft: 30 }}>
                  A toy snapped in half is NOT good.
                </div>
              )}
              {this.state.one && (
                <div style={{ fontSize: 18, marginTop: 5, marginLeft: 30 }}>
                  If you aren't sure, just give it to us anyways!
                </div>
              )}
            </div>
            <div>
              <div
                id="two"
                onClick={() =>
                  this.setState({
                    two: !this.state.two,
                  })
                }
                style={{ marginTop: 20, fontWeight: 500, fontSize: 18 }}
              >
                2. Total value of your items should be at least $10
                <img
                  style={{ marginLeft: 10, width: 20, height: 20 }}
                  src={Down}
                ></img>
              </div>
              {this.state.two && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    marginTop: 10,
                    marginLeft: 30,
                  }}
                >
                  Just use your head, no need to count.
                </div>
              )}
              {this.state.two && (
                <div style={{ fontSize: 18, marginTop: 5, marginLeft: 30 }}>
                  We won't pick up JUST a coffee mug and a hand towel.
                </div>
              )}
              {this.state.two && (
                <div style={{ fontSize: 18, marginTop: 5, marginLeft: 30 }}>
                  We need more items than that!
                </div>
              )}
            </div>
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
                3. On your scheduled time, make sure we can get to the items.
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              onClick={() => this.stripeSignup()}
              id="header-checkout"
              style={{
                display: "flex",
                marginTop: 40,
                marginLeft: 10,
                marginRight: 10,
                width: 150,
                textAlign: "center",
                textDecoration: "none",
                backgroundColor: "#a1a1a1",
                borderRadius: 5,
                padding: 10,
                height: 20,
                fontWeight: 600,
                color: "white",
                alignItems: "center",
                backgroundColor: "#E61E4D",
                justifyContent: "center",
                minWidth: 150,
              }}
            >
              SELL my clutter
            </div>
          </div>
        </div>
      </div>
    );
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
}
