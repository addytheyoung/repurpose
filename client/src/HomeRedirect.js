import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export default class HomeRedirect extends Component {
  render() {
    localStorage.setItem("city", "Austin, TX");
    window.location.href = "/";

    if (!isMobile) {
      return (
        <div
          style={{
            position: "fixed",
            left: "45vw",
            top: 200,
          }}
        >
          <ClipLoader size={150} color={"#123abc"} loading={true} />
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: "100vh",
          }}
        >
          <div
            style={{
              position: "fixed",
              left: window.innerWidth / 2 - 40,
              top: "30vh",
            }}
          >
            <ClipLoader size={80} color={"#123abc"} loading={true} />
          </div>
        </div>
      );
    }
  }
}
