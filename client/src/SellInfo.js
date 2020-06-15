import React from "react";
import HeaderBar from "./HeaderBar";

export default class SellInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <div style={{ marginTop: 30 }}>How do you want to be paid?</div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 60,
                borderWidth: 1,
                borderRadius: 5,
                borderStyle: "solid",
              }}
            >
              Check by mail
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 60,
                borderWidth: 1,
                borderRadius: 5,
                borderStyle: "solid",
              }}
            >
              Paypal
            </div>
          </div>
          <div>Address</div>
          <div>Date and time</div>
        </div>
      </div>
    );
  }
}
