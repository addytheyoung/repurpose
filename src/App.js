import React from "react";
import logo from "./images/logo.svg";
import "./css/App.css";
import HeaderBar from "./HeaderBar";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <HeaderBar />
        </div>
      </div>
    );
  }
}
