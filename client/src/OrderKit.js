import React from "react";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";
import "./css/OrderKit.css";
import { Input, Select, MenuItem } from "@material-ui/core";
import { PayPalButton } from "react-paypal-button-v2";

export default class OrderKit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kit: "email",
      payment: "bank",
    };
  }
  render() {
    return (
      <div>
        <div>
          <HeaderBar />
        </div>
        <div style={{ margin: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ marginTop: 30, fontSize: 22, fontWeight: 600 }}>
              Tell us about you, and these items
            </div>
            {/* <PayPalButton
              amount="0.01"
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details, data) => {
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );

                // OPTIONAL: Call your server to save the transaction
                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderID: data.orderID,
                  }),
                });
              }}
            /> */}

            <div style={{ margin: 10, marginTop: 0 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 30,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 300,
                    marginTop: 20,
                  }}
                >
                  <Input id="name" placeholder={"Full name"} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 300,
                    marginTop: 20,
                  }}
                >
                  <Input id="name" placeholder={"Phone number (Cell)"} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 300,
                    marginTop: 50,
                  }}
                >
                  <Input
                    id="address1"
                    placeholder={"Street Address of items"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 300,
                    marginTop: 20,
                  }}
                >
                  <Input
                    id="address2"
                    placeholder={"Apt, Unit, Floor of items"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 300,
                    marginTop: 20,
                  }}
                >
                  <Input id="zip" placeholder={"Zip code of items"} />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              onClick={() => this.sellingRules()}
              id="next"
              style={{
                marginTop: 20,
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                width: 150,
                fontWeight: 600,
                minWidth: 150,
                backgroundColor: "#a1a1a1",
                padding: 10,
                borderRadius: 5,
                minWidth: 100,
                height: 20,
                textAlign: "center",
              }}
            >
              NEXT
            </div>
          </div>
        </div>
      </div>
    );
  }

  setKit(type, id) {
    if (id === 1) {
      if (type === "email") {
        this.setState({
          kit: "email",
        });
      } else {
        this.setState({
          kit: "box",
        });
      }
    } else {
      this.setState({
        payment: type,
      });
    }
  }

  sellingRules() {
    const name = document.getElementById("name").value.trim();
    // const address1 = document.getElementById("address1").value.trim();
    // const address2 = document.getElementById("address2").value.trim();

    // Check name
    // const numSpaces = name.split(" ").length - 1;
    // if (numSpaces < 1) {
    //   alert("Please enter your full name");
    //   return;
    // }
    // if (address1 == "") {
    //   alert("Please put in your address");
    //   return;
    // }

    firebase
      .firestore()
      .collection("Users")
      .where("uid", "==", "uid1")
      .get()
      .then((a) => {
        const user = a.docs[0].data();
        firebase
          .firestore()
          .collection("Users")
          .doc(user.email)
          .update({
            name: name,
            // address1: address1,
            // address2: address2,
            // city: city,
            // state: state,
            // zip: zip,
            // kit: this.state.kit,
            // payment: this.state.payment
          })
          .then(() => {
            window.location.href =
              "/sell/rules/" + this.state.kit + "&" + this.state.payment;
          });
      });
  }
}
