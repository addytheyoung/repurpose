import React from "react";
import HeaderBar from "./HeaderBar";
import "./css/Sell.css";

export default class Sell extends React.Component {
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
              marginTop: 100
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: 0 }}>
              We buy almost everything!
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
            >
              <div
                style={{
                  height: 200,
                  width: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 20
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  1. Get a clean out kit
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "#a1a1a1"
                  }}
                >
                  Fill it up with items you think others could use, and are not
                  on our bad item list.
                </div>
              </div>
              <div
                style={{
                  height: 200,
                  width: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 20
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  2. Send it off
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "#a1a1a1"
                  }}
                >
                  Leave it for your mail carrier or just drop it at FedEx or
                  USPS.
                </div>
              </div>
              <div
                style={{
                  height: 200,
                  width: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 20
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  3. Get paid right away
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "#a1a1a1"
                  }}
                >
                  You get paid as soon as we get the items, usually around 3
                  days.
                </div>
              </div>
            </div>
            <div
              id="get-started"
              onClick={() => this.getStarted()}
              style={{
                backgroundColor: "#e1e1e1",
                padding: 10,
                borderRadius: 5
              }}
            >
              GET STARTED
            </div>
          </div>
        </div>
      </div>
    );
  }

  getStarted() {
    window.location.href = "/sell/kit";
  }
}
