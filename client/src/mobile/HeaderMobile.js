import React from "react";
import { Input, MenuItem, Select, Avatar } from "@material-ui/core";
import search from "../images/research.png";
import * as firebase from "firebase";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../css/HeaderBar.css";
import Logo from "../images/test.png";
import Info from "../images/info.png";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import LocationCityOutlinedIcon from "@material-ui/icons/LocationCityOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import cart2 from "../images/cart-green.svg";
import Close from "../images/close.png";
import city from "../images/architectonic.png";
import FilterBar from "../FilterBar";
import FilterPageMobile from "./FilterPageMobile.js";
import Filter from "../images/filter.png";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import SignInModal from "../SignInModal";
import CityPageMobile from "./CityPageMobile";
import MobileChat from "./MobileChat";
import Q from "@material-ui/icons/HelpOutline";

export default class HeaderBar extends React.Component {
  citiesList = ["Central TX"];
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
      filterPage: false,
      cityPage: false,
      buySellPage: false,
      minPrice: "",
      maxPrice: "",
      categories: [true, true, true, true, true, true, true, true, true],
      sales: [true, true, true, true, true, true, true, true, true],
    };
  }
  render() {
    return (
      <div style={{ zIndex: 219 }}>
        {this.state.filterPage && (
          <div style={{ zIndex: 220 }}>
            <FilterPageMobile
              updateSaleFilter={(sales) => this.updateSalesFilter(sales)}
              updateCategoryFilter={(category) =>
                this.updateCategoryFilter(category)
              }
              minPrice={this.state.minPrice}
              maxPrice={this.state.maxPrice}
              sales={this.state.sales}
              categories={this.state.categories}
              updateFilter={(a, b) => this.updateFilter(a, b)}
              closePage={() => this.closePage()}
            />
          </div>
        )}
        {this.state.cityPage && (
          <div style={{ zIndex: 220 }}>
            <CityPageMobile closePage={() => this.closePage()} />
          </div>
        )}

        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              borderBottomWidth: 2,
              height: "8vh",
              alignItems: "center",
              borderBottomColor: "#e8e8e8",
              borderBottomStyle: "solid",
              backgroundColor: "#ffffff",
              width: "100vw",
            }}
          >
            <div
              onClick={() => this.openFilterPage()}
              style={{
                minHeight: "80%",
                paddingLeft: 3,
                marginLeft: "2vw",
                paddingRight: 3,
                minWidth: "20vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 0,
                borderStyle: "solid",
                borderRadius: 10,
                backgroundColor: "#dae2f1",
              }}
            >
              <div
                id="search"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 14,
                }}
              >
                <FilterListOutlinedIcon
                  style={{
                    width: "8vw",
                    height: "8vw",
                    color: "#375995",
                    paddingLeft: "1vw",
                  }}
                ></FilterListOutlinedIcon>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#375995",
                    paddingRight: 5,
                    paddingLeft: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  Filters
                </div>
              </div>
            </div>

            <div
              onClick={() =>
                this.setState({
                  cityPage: true,
                })
              }
              style={{
                minHeight: "80%",
                minWidth: "20vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 0,
                borderStyle: "solid",
                borderRadius: 10,
                marginLeft: 15,
                paddingLeft: 3,
                backgroundColor: "#dae2f1",
                paddingRight: 10,
              }}
            >
              <div
                id="search"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 14,
                }}
              >
                <LocationCityOutlinedIcon
                  style={{
                    width: "8vw",
                    height: "8vw",
                    color: "#375995",
                  }}
                ></LocationCityOutlinedIcon>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#375995",
                    paddingRight: 5,
                    paddingLeft: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  {"Central TX"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateSalesFilter(sales) {
    this.setState({
      sales: sales,
      filterPage: false,
    });
    this.props.updateSalesFilter(sales);
  }

  updateCategoryFilter(category) {
    const newCategories = [];

    for (var i = 0; i < this.state.categories.length; i++) {
      if (i == category || category == -1) {
        newCategories.push(true);
      } else {
        newCategories.push(false);
      }
    }
    this.setState({
      categories: newCategories,
      filterPage: false,
    });
    this.props.updateCategoryFilter(newCategories);
  }

  updateFilter(min, max) {
    min = min.substring(1, min.length);
    max = max.substring(1, max.length);
    this.setState({
      minPrice: min,
      maxPrice: max,
      filterPage: false,
    });

    this.props.setPriceFilter(min, max);
  }

  closePage() {
    this.setState({
      filterPage: false,
      cityPage: false,
      buySellPage: false,
    });
  }

  openFilterPage() {
    this.setState({
      filterPage: true,
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

  startShopping() {
    var email = document.getElementById("email").value;
    if (email) {
      email = email.toLowerCase();
    }
    if (!this.checkEmail(email)) {
      return;
    }
    var myUid = null;
    if (localStorage.getItem("tempUid")) {
      // We have a profile. Transfer the data
      myUid = localStorage.getItem("tempUid");
    } else {
      // We don't have a profile. Make a new one
    }

    firebase
      .firestore()
      .collection("Users")
      .where("email", "==", email)
      .get()
      .then((user) => {
        const user2 = user.docs;
        if (user2.length !== 0) {
          // Returning user
          this.setState({
            retUser: true,
            email: email,
          });
        } else {
          // New account, render that screen.
          this.setState({
            newUser: true,
            email: email,
          });
        }
      });
  }

  search() {
    var search = document.getElementById("address-input").value;
    const category = document.getElementById("category").textContent;
    const city = this.state.currentCity;
    if (city === "" || !this.citiesList.includes(city)) {
      alert("Invalid city");
      return;
    } else if (!search || search.trim() === "") {
      alert("Bad search");
      return;
    }
    window.location.href =
      "/search/?" +
      "search=" +
      search +
      "&category=" +
      category +
      "&city=" +
      city;
    return;
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

  checkEmail(email) {
    if (!email) {
      alert("Bad email");
      return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    alert("Bad email");
    return false;
  }

  updateCity(city) {
    var myUid = null;
    if (firebase.auth().currentUser) {
      myUid = firebase.auth().currentUser.uid;
    } else if (localStorage.getItem("tempUid")) {
      myUid = localStorage.getItem("tempUid");
    }
    if (myUid) {
      firebase
        .firestore()
        .collection("Users")
        .doc(myUid)
        .update({
          city: city,
        })
        .then(() => {
          this.setState({
            currentCity: city,
          });
        });
    }
  }

  setPassword() {
    const email = this.state.email;
    const pass = document.getElementById("pass").value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((r) => {
        this.state.logout = false;
        this.state.email = false;
        this.state.newUser = false;
        this.state.retUser = false;
        this.state.profile = false;
        var myUid = localStorage.getItem("tempUid");
        console.log(myUid);
        if (myUid) {
          console.log(myUid);
          // Transfer the data
          firebase
            .firestore()
            .collection("Users")
            .doc(myUid)
            .get()
            .then((me) => {
              console.log(me.data());
              const cart = me.data().cart;
              const orders = me.data().orders;
              const sales = me.data().sales;
              localStorage.setItem("cart", cart.length);
              firebase
                .firestore()
                .collection("Users")
                .doc(r.user.uid)
                .set({
                  cart: cart,
                  orders: orders,
                  sales: sales,
                  email: email,
                  uid: r.user.uid,
                  temporary: false,
                })
                .then(() => {
                  this.state.logout = false;
                  this.state.email = false;
                  this.state.newUser = false;
                  this.state.retUser = false;
                  this.state.profile = false;
                  window.location.reload();
                });
            });
        } else {
          console.log("no uid");
          // Make a new profile
          firebase
            .firestore()
            .collection("Users")
            .doc(r.user.uid)
            .set({
              cart: [],
              orders: [],
              sales: [],
              email: email,
              uid: r.user.uid,
              temporary: false,
            })
            .then(() => {
              this.state.logout = false;
              this.state.email = false;
              this.state.newUser = false;
              this.state.retUser = false;
              this.state.profile = false;
              window.location.reload();
            });
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  setCity() {
    this.setState({
      city: !this.state.city,
      searching: false,
    });
  }

  login() {
    const email = this.state.email;
    const pass = document.getElementById("pass").value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((r) => {
        this.state.logout = false;
        this.state.email = false;
        this.state.newUser = false;
        this.state.retUser = false;
        this.state.profile = false;
        window.location.reload();
      })
      .catch((e) => {
        alert(e.message);
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
    });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.setItem("cart", "0");
        localStorage.setItem("tempUid", "");

        this.state.logout = false;
        this.state.email = false;
        this.state.newUser = false;
        this.state.retUser = false;
        this.state.profile = false;
        window.location.href = "/";
      });
  }
}
