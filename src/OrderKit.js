import React from "react";
import HeaderBar from "./HeaderBar";
import "./css/OrderKit.css";

export default class OrderKit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kit: "email"
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
              alignItems: "center"
            }}
          >
            <div style={{ marginTop: 30 }}>YOUR SELLING KIT</div>
            <div
              style={{
                width: "40vw",
                marginTop: 30,
                height: "50vh",
                backgroundColor: "#eaeaea",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "15vh",
                  borderWidth: 1,
                  borderStyle: "solid"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    minWidth: 300
                  }}
                >
                  <div>Type of kit</div>
                  {this.state.kit === "email" && (
                    <div>Print the label and put it on any box.</div>
                  )}
                  {this.state.kit === "box" && (
                    <div>We mail you a box to put your items in.</div>
                  )}
                </div>
                <div style={{ width: "100%" }}></div>
                <div
                  id="email"
                  style={{
                    backgroundColor:
                      this.state.kit === "email" ? "#f0da51" : "#eaeaea",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50%",
                    padding: 10,
                    minWidth: 150,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 5,
                    borderColor: "#eaeaea"
                  }}
                  onClick={() => this.setKit("email")}
                >
                  EMAIL A LABEL
                </div>
                <div
                  id="box"
                  style={{
                    backgroundColor:
                      this.state.kit === "box" ? "#f0da51" : "#eaeaea",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    height: "50%",
                    minWidth: 150,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 5,
                    borderColor: "#eaeaea"
                  }}
                  onClick={() => this.setKit("box")}
                >
                  MAIL A BOX
                </div>
              </div>
              <div>Your shipping address</div>
            </div>
            <div>NEXT</div>
          </div>
        </div>
      </div>
    );
  }

  setKit(type) {
    if (type === "email") {
      this.setState({
        kit: "email"
      });
    } else {
      this.setState({
        kit: "box"
      });
    }
  }
}
