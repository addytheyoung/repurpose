import React, { Component } from "react";
import Close from "./images/close.png";

export default class City extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { closeModal } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          onClick={(e) => closeModal(e)}
          style={{
            backgroundColor: "#000000",
            left: 0,
            opacity: 0.5,
            zIndex: 99,
            width: "100vw",
            height: "100vh",
            position: "fixed",
          }}
        ></div>
        <div
          style={{
            width: "65vw",
            borderRadius: 5,
            height: "85vh",
            top: 30,
            backgroundColor: "#f5f5f5",
            position: "fixed",
            zIndex: 100,
            opacity: 1,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <img
                id="close"
                onClick={() => closeModal()}
                src={Close}
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 15,
                  marginRight: 15,
                }}
              />
            </div>
          </div>

          <div
            style={{ marginLeft: 50, fontFamily: "Gill Sans", fontSize: 24 }}
          >
            You're viewing our only crate! (The Longhorn crate, for Austin and
            nearby)
          </div>
          <div
            style={{
              marginLeft: 50,
              fontFamily: "Gill Sans",
              marginTop: 20,
              fontSize: 20,
            }}
          >
            We'll be adding more soon!
          </div>
        </div>
      </div>
    );
  }
}
