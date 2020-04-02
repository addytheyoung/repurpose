import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from "firebase";
import Buy from "./Buy";
import Sell from "./Sell";
import OrderKit from "./OrderKit";
import SellRules from "./SellRules";
import Shop from "./Shop";
import Item from "./Item";
import Profile from "./Profile";
import Cart from "./Cart";
import CheckOut from "./CheckOut";
import GetKit from "./GetKit";
import BecomeCollector from "./BecomeCollector";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Home from "./Home";

export default class RenderRoutes extends React.Component {
  render() {
    const stripePromise = loadStripe(
      "pk_test_gLPSHkmFGwodXZBWMQabXaRr00jsYpn5GL"
    );
    if (firebase.auth().currentUser) {
      return (
        <Elements stripe={stripePromise}>
          <Router>
            <Route path="/" exact={true} render={() => <Buy />} />
            <Route
              path="/become_collector"
              exact={true}
              render={() => <BecomeCollector />}
            />
            <Route path="/sell" exact={true} render={() => <Sell />} />
            <Route path="/sell/kit" exact={true} render={() => <OrderKit />} />
            <Route path="/shop" exact={false} render={() => <Shop />} />
            <Route path="/item" exact={false} render={() => <Item />} />
            <Route path="/profile" exact={true} render={() => <Profile />} />
            <Route path="/cart" exact={true} render={() => <Cart />} />
            <Route path="/checkout" exact={true} render={() => <CheckOut />} />
            <Route
              path="/sell/rules"
              exact={false}
              render={() => <SellRules />}
            />
            <Route
              path="/sell/getkit"
              exact={false}
              render={() => <GetKit />}
            />
          </Router>
        </Elements>
      );
    } else {
      return (
        <Elements stripe={stripePromise}>
          <Router>
            {!window.localStorage.getItem("city") && (
              <Route path="/" exact={true} render={() => <Home />} />
            )}

            {window.localStorage.getItem("city") && (
              <Route path="/" exact={true} render={() => <Buy />} />
            )}
            <Route
              path="/become_collector"
              exact={true}
              render={() => <BecomeCollector />}
            />
            <Route path="/sell" exact={true} render={() => <Sell />} />
            <Route path="/shop" exact={false} render={() => <Shop />} />
            <Route path="/item" exact={false} render={() => <Item />} />
            <Route path="/profile" exact={true} render={() => <Profile />} />
            <Route path="/cart" exact={true} render={() => <Cart />} />
            <Route path="/checkout" exact={true} render={() => <CheckOut />} />
          </Router>
        </Elements>
      );
    }
  }
}
