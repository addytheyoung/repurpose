import React from "react";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";
import "./css/OrderKit.css";
import { Input, Select, MenuItem } from "@material-ui/core";
import api from "./api";

import { PayPalButton } from "react-paypal-button-v2";

export default class OrderKit extends React.Component {
  lngPerMile = 57;
  latPerMile = 69;

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
              Let's hear it
            </div>

            <div style={{ margin: 10, marginTop: 0 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 30,
                  justifyContent: "center",
                }}
              >
                {/* <div
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
                  <Input id="phone" placeholder={"Phone number (Cell)"} />
                </div> */}
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

  sellingRules() {
    const API_KEY = "AIzaSyBbpHHOjcFkGJeUaEIQZ-zNVaYBw0UVfzw";

    // const name = document.getElementById("name").value.trim();
    // const phone = document.getElementById("phone").value.trim();
    const address1 = document.getElementById("address1").value.trim();
    const address2 = document.getElementById("address2").value.trim();
    const zip = document.getElementById("zip").value.trim();

    if (!zip) {
      alert("Please enter your zip code");
      return;
    }

    const url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      zip +
      "&key=" +
      API_KEY;

    api.getLatLng(zip).then((a) => {
      console.log(a);
      const latitude = a.results[0].geometry.location.lat;
      const longitude = a.results[0].geometry.location.lng;
      // Check that they are within delivery range

      api.getLatLng(localStorage.getItem("city")).then((a) => {
        console.log(a);
        const latitude2 = a.results[0].geometry.location.lat;
        const longitude2 = a.results[0].geometry.location.lng;
        // Check that they are within delivery range
        const x =
          Math.pow((latitude2 - latitude) * this.latPerMile, 2) +
          Math.pow((longitude2 - longitude) * this.lngPerMile, 2);
        const milesBetween = Math.sqrt(x);
        console.log(milesBetween);
        if (milesBetween >= 15) {
          alert("Sorry, you are too far for delivery.");
          return;
        }

        // localStorage.setItem("name", name);
        // localStorage.setItem("phone", phone);
        localStorage.setItem("address1", address1);
        localStorage.setItem("address2", address2);

        firebase
          .firestore()
          .collection("Users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            // name: name,
            address1: address1,
            address2: address2,
            zip: zip,
          })
          .then(() => {
            window.location.href =
              "/sell/rules/" + this.state.kit + "&" + this.state.payment;
          });
      });
    });

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
  }
}
