import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from "firebase";
import Buy from "./Buy";
import Sell from "./Sell";
import OrderKit from "./OrderKit";
import SellRules from "./SellRules";
import Shop from "./Shop";
import Item from "./Item";

export default class RenderRoutes extends React.Component {
  render() {
    if (firebase.auth().currentUser) {
      return (
        <Router>
          <Route path="/" exact={true} render={() => <Buy />} />
          <Route path="/sell" exact={true} render={() => <Sell />} />
          <Route path="/sell/kit" exact={true} render={() => <OrderKit />} />
          <Route path="/shop" exact={false} render={() => <Shop />} />
          <Route path="/item" exact={false} render={() => <Item />} />
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
          <Route path="/shop" exact={false} render={() => <Shop />} />
          <Route path="/item" exact={false} render={() => <Item />} />
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
