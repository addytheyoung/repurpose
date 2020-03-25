import React from "react";
import HeaderBar from "./HeaderBar";
import { Input } from "@material-ui/core";

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
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
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
          <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "40vw"
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Input
                  onChange={e => this.updateCardNumber(e)}
                  id="card-number"
                  value={this.state.cardNumber}
                  placeholder="Credit Card Number"
                  style={{ width: 300, marginRight: 10, marginLeft: 10 }}
                />
                <Input placeholder="Security Code" />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "40vw"
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Input />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateCardNumber(e) {
    console.log(e);
  }
}
