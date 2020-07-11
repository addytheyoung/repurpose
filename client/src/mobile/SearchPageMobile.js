import React from "react";
import Close from "../images/close.png";

export default class SearchPageMobile extends React.Component {
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
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100vw",
            position: "fixed",
            zIndex: 1,
            borderRadius: 5,
            height: "92.2vh",
            top: 0,
            backgroundColor: "#f5f5f5",
            opacity: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              id="bar"
              style={{
                display: "flex",

                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              asdSDFSDFASDFASDFASDFASDFASDF
            </div>
          </div>
        </div>
      </div>
    );
  }

  closeModal(e) {
    this.props.closePage();
  }
}
