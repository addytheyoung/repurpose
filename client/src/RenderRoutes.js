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
import Agreement from "./Agreement.js";
import CheckOut from "./CheckOut";
import GetKit from "./GetKit";
import BecomeCollector from "./BecomeCollector";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Home from "./Home";
import ItemUpload from "./ItemUpload";
import Orders from "./Orders";
import Sales from "./Sales";
import SearchPage from "./SearchPage";
import AddDatesToFirebase from "./scripts/AddDatesToFirebase";
import Charge from "./Charge";
import Help from "./Help";

export default class RenderRoutes extends React.Component {
  render() {
    const citiesList = ["Athens, TX"];
    const stripePromise = loadStripe(
      "pk_test_gLPSHkmFGwodXZBWMQabXaRr00jsYpn5GL"
    );
    const q = window.location.search;
    const urlParams = new URLSearchParams(q);
    const category = urlParams.get("city");
    if (category) {
      localStorage.setItem("city", category);
    }
    if (firebase.auth().currentUser) {
      return (
        <Elements stripe={stripePromise}>
          <Router>
            {!citiesList.includes(window.localStorage.getItem("city")) && (
              <Route path="/" exact={true} render={() => <Home />} />
            )}

            {citiesList.includes(window.localStorage.getItem("city")) && (
              <Route path="/" exact={true} render={() => <Buy />} />
            )}
            <Route
              path="/andrewitemupload4467"
              exact={true}
              render={() => <ItemUpload />}
            />
            <Route
              path="/become_collector"
              exact={true}
              render={() => <BecomeCollector />}
            />
            <Route path="/orders" exact={true} render={() => <Orders />} />
            <Route path="/mysales" exact={true} render={() => <Sales />} />
            <Route path="/search" exact={false} render={() => <SearchPage />} />
            <Route path="/help" exact={true} render={() => <Help />} />

            <Route path="/sell" exact={true} render={() => <Sell />} />
            <Route path="/sell/kit" exact={true} render={() => <OrderKit />} />
            <Route path="/shop" exact={false} render={() => <Shop />} />
            <Route path="/item" exact={false} render={() => <Item />} />
            <Route path="/profile" exact={true} render={() => <Profile />} />
            <Route path="/cart" exact={true} render={() => <Cart />} />
            <Route path="/checkout" exact={true} render={() => <CheckOut />} />
            <Route
              path="/andrewscripts4467"
              exact={true}
              render={() => <Charge />}
            />
            <Route
              path="/sell/agreement"
              exact={true}
              render={() => <Agreement />}
            />
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
            {!citiesList.includes(window.localStorage.getItem("city")) && (
              <Route path="/" exact={true} render={() => <Home />} />
            )}

            {citiesList.includes(window.localStorage.getItem("city")) && (
              <Route path="/" exact={true} render={() => <Buy />} />
            )}

            <Route path="/search" exact={false} render={() => <SearchPage />} />

            <Route
              path="/become_collector"
              exact={true}
              render={() => <BecomeCollector />}
            />
            <Route
              path="/andrewscripts4467"
              exact={true}
              render={() => <Charge />}
            />
            <Route path="/help" exact={true} render={() => <Help />} />
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
