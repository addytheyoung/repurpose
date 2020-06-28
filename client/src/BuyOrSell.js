import React from "react";
import HeaderBar from "./HeaderBar";

export default class BuyOrSell extends React.Component {
  render() {
    return (
      <div>
        <div>
          <HeaderBar />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20vh",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              onClick={() => (window.location.href = "/sell")}
              id="header-checkout"
              style={{
                display: "flex",
                width: 150,
                textAlign: "center",
                textDecoration: "none",
                backgroundColor: "#426CB4",
                borderRadius: 5,
                padding: 10,
                height: 30,
                fontWeight: 700,
                fontSize: 18,
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 150,
              }}
            >
              SELL MY CLUTTER
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
                marginRight: 20,
                textAlign: "center",
              }}
            >
              OR
            </div>
            <div
              onClick={() => (window.location.href = "/")}
              id="header-checkout"
              style={{
                width: 150,
                display: "flex",
                textAlign: "center",
                textDecoration: "none",
                backgroundColor: "#7628dd",
                borderRadius: 5,
                padding: 10,
                height: 30,
                fontWeight: 600,
                fontSize: 18,
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 150,
              }}
            >
              SHOP FOR ITEMS
            </div>
          </div>
        </div>
      </div>
    );
  }
}
