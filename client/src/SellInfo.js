import React from "react";
import HeaderBar from "./HeaderBar";
import { Input, Button } from "@material-ui/core";
import ScheduleTime from "./ScheduleTime";
import "./css/SellInfo.css";
import api from "./api";
import * as firebase from "firebase";

export default class SellInfo extends React.Component {
  lngPerMile = 57;
  latPerMile = 69;
  constructor(props) {
    super(props);
    this.state = {
      paymentType: "paypal",
      question: 1,
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
            marginTop: "10vh",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 20 }}>Call 903-203-1286</div>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            Or fill out the form below!
          </div>
          {this.state.question == 1 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ marginTop: 30 }}>
                How do you want to be paid? (1/3)
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", marginTop: 20 }}
              >
                <div
                  id="mail"
                  onClick={() =>
                    this.setState({
                      paymentType: "mail",
                    })
                  }
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 200,
                    height: 60,
                    borderWidth: 2,
                    borderRadius: 5,
                    borderStyle: "solid",
                    borderColor:
                      this.state.paymentType == "mail"
                        ? "rgb(118, 40, 221)"
                        : "#000000",
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  Check by mail
                </div>
                <div
                  id="paypal"
                  onClick={() =>
                    this.setState({
                      paymentType: "paypal",
                    })
                  }
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 200,
                    height: 60,
                    borderWidth: 2,
                    borderRadius: 5,
                    borderStyle: "solid",
                    borderColor:
                      this.state.paymentType == "paypal"
                        ? "rgb(118, 40, 221)"
                        : "#000000",
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  Paypal
                </div>
              </div>
              {this.state.paymentType == "mail" && (
                <div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Input
                      id="address1"
                      style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                      placeholder="Mailing Address"
                    ></Input>
                    <Input
                      id="address2"
                      style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                      placeholder="Address 2"
                    ></Input>
                    <Input
                      id="city"
                      style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                      placeholder="City"
                    ></Input>
                    <Input
                      id="state"
                      style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                      placeholder="State"
                    ></Input>
                    <Input
                      id="zip"
                      style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                      placeholder="Zip Code"
                    ></Input>
                    <Input
                      id="phone"
                      style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                      placeholder="Phone Number"
                    ></Input>
                  </div>
                </div>
              )}
              {this.state.paymentType == "paypal" && (
                <div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Input
                      id="paypal1"
                      style={{ width: 250, marginTop: 20, marginBottom: 10 }}
                      placeholder="Paypal Email"
                    ></Input>
                    <Input
                      id="paypal2"
                      style={{ width: 250 }}
                      placeholder="Paypal Email (Repeat)"
                    ></Input>
                    <Input
                      id="phone"
                      style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                      placeholder="Phone Number"
                    ></Input>
                  </div>
                </div>
              )}
              <Button onClick={() => this.nextQuestion()}>NEXT</Button>{" "}
            </div>
          )}
          {this.state.question == 2 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>Where are we headed?</div>
              <Input
                id="address1"
                style={{ marginTop: 10, marginBottom: 5, width: 250 }}
                placeholder="Mailing Address"
              ></Input>
              <Input
                id="address2"
                style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                placeholder="Address 2"
              ></Input>
              <Input
                id="city"
                style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                placeholder="City"
              ></Input>
              <Input
                id="state"
                style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                // placeholder="State"
                value="Texas"
              ></Input>
              <Input
                id="zip"
                style={{ marginTop: 5, marginBottom: 5, width: 250 }}
                placeholder="Zip Code"
              ></Input>

              <Button onClick={() => this.nextQuestion2()}>NEXT</Button>
            </div>
          )}
          {this.state.question == 3 && <ScheduleTime></ScheduleTime>}
        </div>
      </div>
    );
  }

  nextQuestion2() {
    const address1 = document.getElementById("address1").value;
    const address2 = document.getElementById("address2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    if (!address1 || !city || !state || !zip) {
      alert("Please fill out the above");
      return;
    }
    // Check if it's within our range
    api.getLatLng(zip).then((a) => {
      const latitude = a.results[0].geometry.location.lat;
      const longitude = a.results[0].geometry.location.lng;
      // Check that they are within delivery range

      api.getLatLng("78705").then((a) => {
        const latitude2 = a.results[0].geometry.location.lat;
        const longitude2 = a.results[0].geometry.location.lng;
        // Check that they are within delivery range
        const x =
          Math.pow((latitude2 - latitude) * this.latPerMile, 2) +
          Math.pow((longitude2 - longitude) * this.lngPerMile, 2);
        const milesBetween = Math.sqrt(x);
        if (milesBetween >= 40) {
          alert(
            "Sorry, you are too far from us! We'll be in your town soon! :)"
          );
          return;
        } else {
          this.setState({
            question: 3,
          });
        }
      });
    });
  }

  nextQuestion() {
    const phone = document.getElementById("phone").value;
    if (this.state.paymentType == "mail") {
      const address1 = document.getElementById("address1").value;
      const address2 = document.getElementById("address2").value;
      const city = document.getElementById("city").value;
      const state = document.getElementById("state").value;
      const zip = document.getElementById("zip").value;
      if (!address1 || !city || !state || !zip || !phone) {
        alert("Please fill out the above");
        return;
      }
    } else {
      const paypal1 = document.getElementById("paypal1").value;
      const paypal2 = document.getElementById("paypal2").value;
      if (!paypal1 || !phone) {
        alert("Please fill out the above");
        return;
      }
      if (paypal1 != paypal2) {
        alert("Emails don't match!");
        return;
      }
      if (!this.checkEmail(paypal1)) {
        return;
      }
    }
    this.setState({
      question: 2,
    });
  }

  checkEmail(email) {
    if (!email) {
      alert("Bad email");
      return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    alert("Bad email");
    return false;
  }
}
