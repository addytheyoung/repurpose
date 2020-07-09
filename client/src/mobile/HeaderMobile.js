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
import Shop from "../Shop";
import Close from "../images/close.png";
import city from "../images/architectonic.png";
import FilterBar from "../FilterBar";
import Filter from "../images/filter.png";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";

export default class HeaderBar extends React.Component {
  citiesList = ["Austin, TX"];
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
    };
  }
  render() {
    const singedin = !!firebase.auth().currentUser;
    const signedModal = !singedin && !this.state.newUser && !this.state.retUser;
    const path = window.location.pathname;
    return (
      <div>
        {this.state.profile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",

              // alignItems: "center"
            }}
          >
            <div
              onClick={(e) => this.closeModal(e)}
              style={{
                backgroundColor: "#000000",
                opacity: 0.5,
                zIndex: 99,
                width: "100vw",
                height: "100vh",
                position: "fixed",
              }}
            ></div>
            <div
              style={{
                width: "30vw",
                borderRadius: 5,
                height: "40vh",
                top: 30,
                backgroundColor: "#f5f5f5",
                position: "fixed",
                zIndex: 100,
                opacity: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    id="close"
                    onClick={() => this.closeModal()}
                    src={Close}
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 20,
                      marginRight: 20,
                    }}
                  />
                </div>
                {signedModal && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 600 }}>
                      Sign up / sign in
                    </div>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      style={{ width: 300, marginTop: 20 }}
                    />
                    <div
                      onClick={() => this.startShopping()}
                      id="start-shopping"
                      style={{
                        backgroundColor: "#426CB4",
                        borderRadius: 5,
                        padding: 10,
                        height: 30,
                        width: 300,
                        color: "white",
                        fontWeight: 600,
                        marginTop: 10,
                        marginBottom: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      START SHOPPING
                    </div>
                  </div>
                )}
                {!singedin && this.state.newUser && (
                  <div>
                    <div
                      style={{ fontSize: 20, fontWeight: 600, marginTop: 20 }}
                    >
                      What will your password be?
                    </div>
                    <Input
                      id="pass"
                      type="password"
                      placeholder="Password"
                      style={{ width: 300, marginTop: 30 }}
                    />
                    <div
                      onClick={() => this.setPassword()}
                      id="start-shopping"
                      style={{
                        backgroundColor: "#426CB4",
                        borderRadius: 5,
                        padding: 10,
                        height: 30,
                        width: 300,
                        color: "white",
                        fontWeight: 600,
                        marginTop: 10,
                        marginBottom: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      START SHOPPING
                    </div>
                  </div>
                )}
                {!singedin && this.state.retUser && (
                  <div>
                    {" "}
                    <div>
                      <div
                        style={{ fontSize: 20, fontWeight: 600, marginTop: 20 }}
                      >
                        Welcome back! What is your password?
                      </div>
                      <Input
                        id="pass"
                        type="password"
                        placeholder="Password"
                        style={{ width: 300, marginTop: 30 }}
                      />
                      <div
                        onClick={() => this.login()}
                        id="start-shopping"
                        style={{
                          backgroundColor: "#426CB4",
                          borderRadius: 5,
                          padding: 10,
                          height: 30,
                          width: 300,
                          color: "white",
                          fontWeight: 600,
                          marginTop: 10,
                          marginBottom: 10,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        START SHOPPING
                      </div>
                    </div>
                  </div>
                )}
                {singedin && !this.state.logout && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        marginBottom: 20,
                      }}
                    >
                      Profile
                    </div>
                    <div
                      onClick={() => (window.location.href = "/orders")}
                      id="my-orders"
                      style={{
                        backgroundColor: "#a1a1a1",
                        borderRadius: 5,
                        padding: 10,
                        height: 30,
                        width: 100,
                        color: "white",
                        fontWeight: 600,
                        marginTop: 10,
                        marginBottom: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      MY ORDERS
                    </div>
                    {/* <div
                      onClick={() => (window.location.href = "/mysales")}
                      id="my-sales"
                      style={{
                        backgroundColor: "#a1a1a1",
                        borderRadius: 5,
                        padding: 10,
                        height: 30,
                        width: 100,
                        color: "white",
                        fontWeight: 600,
                        marginTop: 10,
                        marginBottom: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      MY SALES
                    </div> */}
                    <div
                      onClick={() =>
                        this.setState({
                          logout: true,
                        })
                      }
                      id="logout"
                      style={{
                        backgroundColor: "#a1a1a1",
                        borderRadius: 5,
                        padding: 10,
                        height: 30,
                        width: 100,
                        color: "white",
                        fontWeight: 600,
                        marginTop: 10,
                        marginBottom: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      LOG OUT
                    </div>
                  </div>
                )}
                {this.state.logout && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 600 }}>
                      Are you sure you want to logout?
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 20,
                      }}
                    >
                      <div
                        id="logout-yes"
                        onClick={() => this.logout()}
                        style={{
                          backgroundColor: "#a1a1a1",
                          borderRadius: 5,
                          padding: 10,
                          height: 30,
                          width: 100,
                          color: "white",
                          fontWeight: 600,
                          marginTop: 10,
                          marginBottom: 10,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 10,
                        }}
                      >
                        YES
                      </div>
                      <div
                        id="logout-no"
                        onClick={() => this.closeModal()}
                        style={{
                          marginLeft: 10,
                          backgroundColor: "#a1a1a1",
                          borderRadius: 5,
                          padding: 10,
                          height: 30,
                          width: 100,
                          color: "white",
                          fontWeight: 600,
                          marginTop: 10,
                          marginBottom: 10,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        CANCEL
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
              style={{
                minHeight: "60%",

                marginLeft: 20,
                width: "20vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 5,
                backgroundColor: "#c7d4ea",
              }}
            >
              <div
                id="search"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 36,
                }}
              >
                <FilterListOutlinedIcon
                  style={{
                    width: "8vw",
                    height: "8vw",
                  }}
                ></FilterListOutlinedIcon>
                <div style={{ fontWeight: 500, fontSize: 32 }}>Filters</div>
              </div>
            </div>

            <div
              style={{
                minHeight: "60%",
                width: "20vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 5,
                marginLeft: 15,
                backgroundColor: "#c7d4ea",
              }}
            >
              <div
                id="search"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 36,
                }}
              >
                <LocationCityOutlinedIcon
                  style={{
                    width: "8vw",
                    height: "8vw",
                  }}
                ></LocationCityOutlinedIcon>
                <div style={{ fontWeight: 500, fontSize: 32 }}>
                  {localStorage.getItem("city")}
                </div>
              </div>
            </div>

            <div
              style={{
                minHeight: "60%",
                marginLeft: 15,

                width: "15vw",
                paddingRight: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 5,
                backgroundColor: "#c7d4ea",
              }}
            >
              <div
                id="search"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 36,
                }}
              >
                <AttachMoneyOutlinedIcon
                  style={{
                    width: "8vw",
                    height: "8vw",
                  }}
                ></AttachMoneyOutlinedIcon>
                <div style={{ fontWeight: 500, fontSize: 32 }}>Buy</div>
              </div>
            </div>

            {/* <Link
              id="buy-link"
              to="/"
              style={{
                display: "flex",
                marginLeft: 30,
                fontSize: 36,
                fontWeight:
                  path === "/" || path.includes("shop") || path.includes("cart")
                    ? 600
                    : 500,
                alignItems: "center",
                width: "15vw",
                textDecoration: "none",
                height: "10vw",
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
              }}
            >
              Buy
            </Link>
            <Link
              id="sell-link"
              to="/sell"
              style={{
                display: "flex",
                width: "15vw",
                fontSize: 36,
                height: "10vw",
                fontWeight: path.includes("sell") ? 700 : 500,
                alignItems: "center",
                textDecoration: "none",
                color: path.includes("sell") ? "#000000" : "#000000",
                justifyContent: "center",
                backgroundColor: path.includes("sell") ? "#d8d8d8" : "#ffffff",
                borderRadius: 3,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#d1d1d1",
              }}
            >
              Sell
            </Link> */}

            {/* <div
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
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.state.searching === false && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={search}
                      style={{
                        width: "6vw",
                        height: "6vw",
                      }}
                    />
                    <div style={{ fontWeight: 500 }}>Search</div>
                  </div>
                )}
              </div>
            </div>
            {this.state.searching && (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Input
                    defaultValue={
                      this.props.searchTerm ? this.props.searchTerm : ""
                    }
                    id="address-input"
                    placeholder="Search for anything"
                    style={{ marginRight: 5, height: 40 }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 120,
                  }}
                >
                  <Select
                    style={{ height: 40, fontSize: 14, width: 120 }}
                    id="category"
                    defaultValue={"All Categories"}
                  >
                    <MenuItem value={"All Categories"}>All Categories</MenuItem>
                    <MenuItem value={"Art & Decoration"}>
                      Art & Decoration
                    </MenuItem>
                    <MenuItem value={"Books"}>Books</MenuItem>
                    <MenuItem value={"Clothing, Shoes, & Accessories"}>
                      {"Clothing, Shoes, & Accessories"}
                    </MenuItem>
                    <MenuItem value={"Electronics"}>{"Electronics"}</MenuItem>
                    <MenuItem value={"Home"}>{"Home"}</MenuItem>
                    <MenuItem value={"Garden"}>{"Garden"}</MenuItem>

                    <MenuItem value={"Pet Supplies"}>{"Pet Supplies"}</MenuItem>

                    <MenuItem value={"Sports & Hobbies"}>
                      {"Sports & Hobbies"}
                    </MenuItem>
                    <MenuItem value={"Toys & Games"}>{"Toys & Games"}</MenuItem>
                  </Select>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    id="search-button"
                    onClick={() => this.search()}
                    style={{
                      marginLeft: 5,
                      borderRadius: 5,
                      width: 40,
                      height: 40,
                      backgroundColor: "#e1e1e1",
                      display: "flex",
                      justifyContent: "center",
                      minWidth: 30,
                      alignItems: "center",
                      marginRight: 20,
                    }}
                  >
                    <img src={search} style={{ width: 20, height: 20 }} />
                  </div>
                </div>
              </div>
            )}*/}
          </div>
        </div>
      </div>
    );
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
    const email = document.getElementById("email").value;
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
