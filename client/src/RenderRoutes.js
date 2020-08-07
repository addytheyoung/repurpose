import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from "firebase";
import Buy from "./Buy";
import FooterMobile from "./mobile/FooterMobile";
import GetTotal from "./scripts/GetTotal";
import OrderKit from "./OrderKit";
import Shop from "./Shop";
import SellInfo from "./SellInfo";
import WhatHaveISoldPage from "./WhatHaveISoldPage";
import Item from "./Item";
import Profile from "./Profile";
import Cart from "./Cart";
import AndrewItemPage from "./AndrewItemPage";
import AndrewOrders from "./AndrewOrders";
import Agreement from "./Agreement.js";
import CheckOut from "./CheckOut";
import GetKit from "./GetKit";
import BecomeCollector from "./BecomeCollector";
import ItemPriceScraper from "./ItemPriceScraper.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Home from "./Home";
import ItemUpload from "./ItemUpload";
import Orders from "./Orders";
import SearchPage from "./SearchPage";
import AddDatesToFirebase from "./scripts/AddDatesToFirebase";
import Charge from "./Charge";
import Help from "./Help";
import MoveItemCategory from "./scripts/MoveItemCategory";
import BuyOrSell from "./BuyOrSell";
import Sell_2 from "./Sell_2";
import MoveItemCities from "./scripts/MoveItemCities";
import MoveCategoryCategory from "./scripts/MoveCategoryCategory";
import MoveMultipleItemCategory from "./scripts/MoveMutlipleItemCategory";
import UpdateId from "./scripts/UpdateId";
import ChangePrices from "./scripts/ChangePrices";
import MoveToOrders from "./scripts/MoveToOrders";
import AndrewTest from "./AndrewTest";
import HomeMobile from "./mobile/HomeMobile";
import BuyMobile from "./mobile/BuyMobile";
import CartMobile from "./mobile/CartMobile";
import NewItemVariable from "./scripts/NewItemVariable";
import SellMobile from "./mobile/SellMobile";
import HomeRedirect from "./HomeRedirect";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import SearchPageMobile from "./mobile/SearchPageMobile";
import CheckOutMobile from "./mobile/CheckOutMobile";
import SearchPageMobileMain from "./mobile/SearchPageMobileMain";
import SignInModal from "./SignInModal";

export default class RenderRoutes extends React.Component {
  render() {
    const citiesList = ["Austin, TX"];
    const stripePromise = loadStripe(
      "pk_live_itqCm5p1Rz7TXk3yTbf4NmVk00z0tkZ7rP"
    );
    const q = window.location.search;
    const urlParams = new URLSearchParams(q);
    const category = urlParams.get("city");
    if (category) {
      localStorage.setItem("city", category);
    }

    if (firebase.auth().currentUser) {
      // Mobile?
      if (isMobile) {
        return (
          <Elements stripe={stripePromise}>
            <Router>
              {!citiesList.includes(window.localStorage.getItem("city")) && (
                <Route path="/" exact={true} render={() => <HomeMobile />} />
              )}
              <Route path="/help" exact={true} render={() => <Help />} />

              {citiesList.includes(window.localStorage.getItem("city")) && (
                <Route path="/" exact={true} render={() => <BuyMobile />} />
              )}
              <Route path="/sell" exact={true} render={() => <SellMobile />} />
              <Route
                path="/what-have-i-sold"
                exact={true}
                render={() => <WhatHaveISoldPage />}
              />
              <Route
                path="/search"
                exact={true}
                render={() => <SearchPageMobileMain />}
              />
              <Route path="/cart" exact={true} render={() => <CartMobile />} />
              <Route
                path="/checkout"
                exact={true}
                render={() => <CheckOutMobile />}
              />
              <Route
                path="/andrewitemupload"
                exact={true}
                render={() => <ItemUpload />}
              />
              <Route
                path="/home-redirect"
                exact={true}
                render={() => <HomeRedirect />}
              />
            </Router>
          </Elements>
        );
      }
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
              path="/what-have-i-sold"
              exact={true}
              render={() => <WhatHaveISoldPage />}
            />
            <Route
              path="/home-redirect"
              exact={true}
              render={() => <HomeRedirect />}
            />
            <Route
              path="/andrewtest"
              exact={true}
              render={() => <AndrewTest />}
            />
            <Route
              path="/andrewitempage"
              exact={true}
              render={() => <AndrewItemPage />}
            />
            <Route
              path="/andreworders"
              exact={true}
              render={() => <AndrewOrders />}
            />
            <Route
              path="/andrewitemupload"
              exact={true}
              render={() => <ItemUpload />}
            />
            <Route
              path="/andrewitemprice4467"
              exact={true}
              render={() => <ItemPriceScraper />}
            />
            <Route
              path="/andrewscripts4500"
              exact={true}
              render={() => <MoveItemCities />}
            />
            <Route
              path="/andrewscripts4501"
              exact={true}
              render={() => <MoveCategoryCategory />}
            />
            <Route
              path="/andrewscripts4502"
              exact={true}
              render={() => <MoveMultipleItemCategory />}
            />
            <Route
              path="/andrewscripts4503"
              exact={true}
              render={() => <UpdateId />}
            />
            <Route
              path="/andrewscripts4504"
              exact={true}
              render={() => <ChangePrices />}
            />
            <Route
              path="/andrewscripts4506"
              exact={true}
              render={() => <MoveToOrders />}
            />
            <Route
              path="/andrewscripts4951"
              exact={true}
              render={() => <NewItemVariable />}
            />
            <Route
              path="/become_collector"
              exact={true}
              render={() => <BecomeCollector />}
            />
            <Route path="/orders" exact={true} render={() => <Orders />} />
            <Route path="/search" exact={false} render={() => <SearchPage />} />
            <Route path="/help" exact={true} render={() => <Help />} />

            <Route path="/sell" exact={true} render={() => <Sell_2 />} />
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
              path="/facebooklink"
              exact={true}
              render={() => <BuyOrSell />}
            />
            <Route
              path="/andrewscripts4468"
              exact={true}
              render={() => <GetTotal />}
            />
            <Route
              path="/andrewscripts4469"
              exact={true}
              render={() => <MoveItemCategory />}
            />
            <Route
              path="/andrewscripts4470"
              exact={true}
              render={() => <AddDatesToFirebase />}
            />
            <Route
              path="/sell/agreement"
              exact={true}
              render={() => <Agreement />}
            />
            <Route
              path="/sell-info"
              exact={false}
              render={() => <SellInfo />}
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
      if (isMobile) {
        return (
          <Elements stripe={stripePromise}>
            <Router>
              {!citiesList.includes(window.localStorage.getItem("city")) && (
                <Route path="/" exact={true} render={() => <HomeMobile />} />
              )}

              {citiesList.includes(window.localStorage.getItem("city")) && (
                <Route path="/" exact={true} render={() => <BuyMobile />} />
              )}

              <Route path="/sell" exact={true} render={() => <SellMobile />} />

              <Route
                path="/what-have-i-sold"
                exact={true}
                render={() => <WhatHaveISoldPage />}
              />
              <Route
                path="/search"
                exact={true}
                render={() => <SearchPageMobileMain />}
              />
              <Route path="/help" exact={true} render={() => <Help />} />

              <Route path="/cart" exact={true} render={() => <CartMobile />} />
              <Route
                path="/checkout"
                exact={true}
                render={() => <CheckOutMobile />}
              />
              <Route
                path="/home-redirect"
                exact={true}
                render={() => <HomeRedirect />}
              />
            </Router>
          </Elements>
        );
      }
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
              path="/what-have-i-sold"
              exact={true}
              render={() => <WhatHaveISoldPage />}
            />

            <Route
              path="/facebooklink"
              exact={true}
              render={() => <BuyOrSell />}
            />

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
            <Route
              path="/andrewscripts4469"
              exact={true}
              render={() => <MoveItemCategory />}
            />
            <Route
              path="/home-redirect"
              exact={true}
              render={() => <HomeRedirect />}
            />
            <Route path="/help" exact={true} render={() => <Help />} />
            <Route path="/sell" exact={true} render={() => <Sell_2 />} />
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
