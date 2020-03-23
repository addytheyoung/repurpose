import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from "firebase";
import Buy from "./Buy";
import Sell from "./Sell";
import OrderKit from "./OrderKit";
import SellRules from "./SellRules";

export default class RenderRoutes extends React.Component {
  render() {
    if (firebase.auth().currentUser) {
      return (
        <Router>
          <Route path="/" exact={true} render={() => <Buy />} />
          <Route path="/sell" exact={true} render={() => <Sell />} />
          <Route path="/sell/kit" exact={true} render={() => <OrderKit />} />
          <Route
            path="/sell/rules"
            exact={false}
            render={() => <SellRules />}
          />
        </Router>
      );
    } else {
      return (
        <Router>
          <Route path="/" exact={true} render={() => <Buy />} />
          <Route path="/sell" exact={true} render={() => <Sell />} />
          <Route path="/sell/kit" exact={true} render={() => <OrderKit />} />
          <Route
            path="/sell/rules"
            exact={false}
            render={() => <SellRules />}
          />
        </Router>
      );
    }
  }
}
