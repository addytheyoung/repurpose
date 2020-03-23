import React from "react";
import "./css/App.css";
import HeaderBar from "./HeaderBar";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <HeaderBar />
        </div>
        <div>BUY HERE</div>
      </div>
    );
  }
}
