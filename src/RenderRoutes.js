import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from "firebase";
import App from "./App";
import Sell from "./Sell";

export default class RenderRoutes extends React.Component {
  render() {
    if (firebase.auth().currentUser) {
      return (
        <Router>
          <Route path="/" exact={true} render={() => <App />} />
          <Route path="/sell" exact={true} render={() => <Sell />} />
        </Router>
      );
    } else {
      return (
        <Router>
          <Route path="/" exact={true} render={() => <App />} />
          <Route path="/sell" exact={true} render={() => <Sell />} />
        </Router>
      );
    }
  }
}
