import React from "react";
import { Input, MenuItem, Select, Avatar } from "@material-ui/core";
import * as firebase from "firebase";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./css/HeaderBar.css";
import Logo from "./images/test.png";
import Info from "./images/info.png";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import cart2 from "./images/cart-green.svg";
import Close from "./images/close.png";
import city from "./images/architectonic.png";
import FilterBar from "./FilterBar";
import Pin from "./images/gps.svg";
import Treasure from "./images/treasureGIMP.png";
import Profile from "./Profile";
import Search from "./Search";
import search from "./images/research.png";
import City from "./City";

export default class HeaderBar extends React.Component {
  citiesList = ["Longhorn"];
  constructor(props) {
    super(props);
    this.state = {
      profile: false,
      logout: false,
      newUser: false,
      retUser: false,
      email: "",
      searching: false,
      currentCity: localStorage.getItem("city"),
      currentLocation: "Longhorn",
    };
  }
  render() {
    const { resetState } = this.props;
    const singedin = !!firebase.auth().currentUser;
    const signedModal = !singedin && !this.state.newUser && !this.state.retUser;
    const path = window.location.pathname;

    return (
      <div>
        {this.state.profile && <Profile closeModal={() => this.closeModal()} />}
        {this.state.searching && (
          <Search closeModal={() => this.closeModal()}></Search>
        )}

        {this.state.city && <City closeModal={() => this.closeModal()} />}

        <div style={{ height: 80, display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#e8e8e8",
              borderBottomStyle: "solid",
              backgroundColor: "#ffffff",
              width: "100vw",
            }}
          >
            <Link
              to="/"
              onClick={() => (resetState ? resetState() : null)}
              style={{
                marginRight: 20,
                marginLeft: 20,
                width: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                textDecoration: "none",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 100,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontFamily: "Pridi",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 28,
                    color: "#426CB4",
                    height: 30,
                  }}
                >
                  Tate's
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontFamily: "Pridi",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 28,
                    color: "#AF7366",
                    height: 30,
                  }}
                >
                  Crate
                </div>
              </div>
              <img
                style={{ width: 50, height: 50, marginLeft: 0 }}
                src={Treasure}
              ></img>
            </Link>
            <Link
              onClick={() => (resetState ? resetState() : null)}
              id="buy-link"
              to="/"
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight:
                  path === "/" || path.includes("shop") || path.includes("cart")
                    ? 600
                    : 500,
                alignItems: "center",
                minWidth: 80,
                textDecoration: "none",

                color:
                  path === "/" || path.includes("shop") || path.includes("cart")
                    ? "#000000"
                    : "#000000",
                justifyContent: "center",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#d1d1d1",
                backgroundColor:
                  path === "/" || path.includes("shop") || path.includes("cart")
                    ? "#d8d8d8"
                    : "#ffffff",
                borderRadius: 3,
                marginLeft: 10,
                fontFamily: "Gill Sans",
              }}
            >
              Buy
            </Link>
            <Link
              id="sell-link"
              to="/sell"
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: path.includes("sell") ? 700 : 500,
                alignItems: "center",
                minWidth: 80,
                textDecoration: "none",
                color: path.includes("sell") ? "#000000" : "#000000",
                justifyContent: "center",
                backgroundColor: path.includes("sell") ? "#d8d8d8" : "#ffffff",
                borderRadius: 3,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#d1d1d1",
                fontFamily: "Gill Sans",
              }}
            >
              Sell
            </Link>

            <div style={{ width: "100%" }}>
              {/* <FilterBar
                updateFilter={(a, b) => this.props.updateFilter(a, b)}
              /> */}
            </div>

            <div
              onClick={() =>
                this.setState({
                  searching: !this.state.searching,
                  city: false,
                })
              }
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                id="search"
                style={{
                  height: "5vh",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={search}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 5,
                  }}
                />
                <div
                  style={{
                    marginRight: 30,
                    fontWeight: 600,
                    fontFamily: "Gill Sans",
                  }}
                >
                  Search
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => this.setCity()}
                  id="search"
                  style={{
                    height: "5vh",
                    display: "flex",
                    flexWrap: "nowrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    marginRight: 30,
                  }}
                >
                  <img
                    src={Pin}
                    style={{
                      width: 22,
                      height: 22,
                      marginRight: 5,
                    }}
                  />

                  <div
                    style={{
                      fontWeight: 600,
                      flexWrap: "nowrap",
                      whiteSpace: "nowrap",
                      fontFamily: "Gill Sans",
                    }}
                  >
                    {this.state.currentLocation}
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => (window.location.href = "/help")}
              id="help"
              style={{
                marginRight: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={Info}
                style={{
                  width: 22,
                  height: 22,
                  marginRight: 5,
                }}
              />
              <div style={{ fontWeight: 600, fontFamily: "Gill Sans" }}>
                About
              </div>
            </div>

            <div
              id="profile-button"
              onClick={() => this.showProfileModal()}
              style={{
                display: "flex",
                textDecoration: "none",
                color: "black",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 30,
              }}
            >
              <AccountCircleOutlinedIcon
                style={{ width: 25, height: 25, marginRight: 3 }}
              ></AccountCircleOutlinedIcon>
              <div style={{ fontWeight: 600, fontFamily: "Gill Sans" }}>
                Profile
              </div>
            </div>
            <a
              href="/cart"
              style={{
                display: "flex",
                textDecoration: "none",
                color: "black",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 50,
              }}
            >
              {!localStorage.getItem("cart") ||
                (localStorage.getItem("cart") == 0 && (
                  <ShoppingCartOutlinedIcon
                    style={{ width: 25, height: 25 }}
                  ></ShoppingCartOutlinedIcon>
                ))}

              {localStorage.getItem("cart") &&
                localStorage.getItem("cart") != 0 && (
                  <img style={{ width: 25, height: 25 }} src={cart2} />
                )}

              <div
                style={{
                  color: "rgb(66, 108, 180)",
                  fontWeight: 700,
                  fontSize: 18,
                  padding: 5,
                }}
              >
                {localStorage.getItem("cart") &&
                  localStorage.getItem("cart") != 0 &&
                  "(" + localStorage.getItem("cart") + ")"}
              </div>
            </a>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  closeSearchModal(e) {
    this.setState({
      searching: false,
    });
  }

  getCityFromAddress(address) {
    if (!address) {
      return "";
    }
    for (var i = 0; i < address.length; i++) {
      if (address[i] === ",") {
        return address.substring(0, i);
      }
    }
  }

  searchMatchesItem(search, itemData) {
    if (!itemData || !itemData.title) {
      return false;
    } else if (
      // Title matches directly
      itemData.title.toString().toLowerCase().includes(search)
    ) {
      return true;
    }
    for (var i = 0; i < itemData.sub_categories.length; i++) {
      const subCategory = itemData.sub_categories[i];
      if (subCategory.includes(search)) {
        return true;
      }
    }
  }

  setCity() {
    this.setState({
      city: !this.state.city,
      searching: false,
    });
  }

  showProfileModal() {
    this.setState({
      profile: true,
      searching: false,
      city: false,
      logout: false,
    });
  }

  closeModal(e) {
    this.setState({
      profile: false,
      logout: false,
      email: false,
      newUser: false,
      retUser: false,
      searching: false,
      city: false,
    });
  }
}
