import React from "react";
import HeaderBar from "./HeaderBar";
import { Input } from "@material-ui/core";

export default class CheckOut extends React.Component {
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
            Re-Purpose
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "40vw"
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Input />
                <Input />
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
}
