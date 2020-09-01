import React from "react";
import Close from "../images/close.png";

export default class BuySellPageMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center"
        }}
      >
        <div
          onClick={(e) => this.closeModal(e)}
          style={{
            backgroundColor: "#000000",
            opacity: 0.5,
            zIndex: 99,
            width: "100vw",
            height: "100vh",
            position: "fixed",
          }}
        ></div>
        <div
          style={{
            width: "100vw",
            borderRadius: 5,
            position: "fixed",
            height: "100vh",
            top: 0,
            backgroundColor: "#f5f5f5",
            // position: "absolute",
            zIndex: 100,
            opacity: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
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
                onClick={() => this.closeModal()}
                src={Close}
                style={{
                  width: 30,
                  height: 30,
                  top: 20,
                  right: 20,
                  position: "fixed",
                }}
              />
            </div>
          </div>

          <div>
            <div>Buy</div>
            <div>Sell</div>
          </div>
        </div>
      </div>
    );
  }

  closeModal(e) {
    this.props.closePage();
  }
}
