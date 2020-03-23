import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from "firebase";
import App from "./App";
import Sell from "./Sell";
import OrderKit from "./OrderKit";

export default class RenderRoutes extends React.Component {
  render() {
    if (firebase.auth().currentUser) {
      return (
        <Router>
          <Route path="/" exact={true} render={() => <App />} />
          <Route path="/sell" exact={true} render={() => <Sell />} />
          <Route path="/sell/kit" exact={true} render={() => <OrderKit />} />
        </Router>
      );
    } else {
      return (
        <Router>
          <Route path="/" exact={true} render={() => <App />} />
          <Route path="/sell" exact={true} render={() => <Sell />} />
          <Route path="/sell/kit" exact={true} render={() => <OrderKit />} />
        </Router>
      );
    }
  }
}
