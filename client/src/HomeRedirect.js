import React, { Component } from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import LoadingPage from "./LoadingPage";

export default class HomeRedirect extends Component {
  render() {
    localStorage.setItem("city", "Austin, TX");
    window.location.href = "/";

    if (!isMobile) {
      return (
        <div>
          <LoadingPage />
        </div>
      );
    } else {
      return (
        <div>
          <LoadingPage />
        </div>
      );
    }
  }
}
