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
    var { page } = this.props;

    return (
      <div style={{ zIndex: 219 }}>
        {this.state.filterPage && (
          <div style={{ zIndex: 220 }}>
            <FilterPageMobile
              changePage={(page) => this.updatePageFilter(page)}
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

        {!page && (
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
                  padding: 5,
                  height: "80%",
                  borderStyle: "solid",
                  backgroundColor: "white",
                  borderColor: "rgb(55, 89, 149)",
                  borderWidth: 0.5,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginLeft: 5,
                  marginRight: 5,
                  display: "flex",
                  // width: windowWidth * 0.3,
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
                    fontFamily: "Gill Sans",
                    color: "black",
                    fontWeight: "400",
                    marginLeft: 5,
                    fontSize: 17,
                  }}
                >
                  Filters
                </div>
              </div>

              <div
                onClick={() =>
                  this.setState({
                    cityPage: true,
                  })
                }
                style={{
                  padding: 5,
                  height: "80%",
                  borderStyle: "solid",
                  backgroundColor: "white",
                  borderColor: "rgb(55, 89, 149)",
                  borderWidth: 0.5,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginLeft: 5,
                  marginRight: 5,
                  display: "flex",
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
                    fontFamily: "Gill Sans",
                    color: "black",
                    fontWeight: "400",
                    marginLeft: 5,
                    fontSize: 17,
                  }}
                >
                  Longhorn
                </div>
              </div>

              <div
                onClick={() => (window.location.href = "/sell")}
                style={{
                  padding: 5,
                  height: "80%",
                  borderStyle: "solid",
                  backgroundColor: "white",
                  borderColor: "rgb(55, 89, 149)",
                  borderWidth: 0.5,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginLeft: 5,
                  marginRight: 5,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    fontFamily: "Gill Sans",
                    color: "black",
                    fontWeight: "400",
                    marginLeft: 5,
                    fontSize: 17,
                  }}
                >
                  Sell
                </div>
              </div>
            </div>
          </div>
        )}

        {page && (
          <div
            onClick={() => this.props.closePage()}
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <div
              style={{
                fontFamily: "Gill Sans",
                fontSize: 16,
                // color: 'rgb(24, 118, 242)',
              }}
            >
              {page}
            </div>
            <div
              style={{
                fontFamily: "Gill Sans",
                fontSize: 16,
                color: "rgb(24, 118, 242)",
                paddingLeft: 5,
              }}
            >
              {"[X]"}
            </div>
          </div>
        )}
      </div>
    );
  }

  updatePageFilter(page) {
    this.setState({
      page: page,
      filterPage: false,
    });
    this.props.updatePageFilter(page);
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
              const cartUids = me.data().cart;
              const orders = me.data().orders;
              const sales = me.data().sales;
              localStorage.setItem("cart", cart.length);
              firebase
                .firestore()
                .collection("Users")
                .doc(r.user.uid)
                .set({
                  cart: cart,
                  cart_uids: cartUids,
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
              cart_uids: [],
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
