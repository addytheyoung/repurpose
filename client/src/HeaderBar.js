import React from "react";
import { Input, MenuItem, Select, Avatar } from "@material-ui/core";
import search from "./images/research.png";
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
import Shop from "./Shop";
import Close from "./images/close.png";
import city from "./images/architectonic.png";
import FilterBar from "./FilterBar";
import Pin from "./images/gps.svg";

export default class HeaderBar extends React.Component {
  citiesList = ["Central Texas"];
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
      currentLocation: "Central Texas",
    };
  }
  render() {
    const singedin = !!firebase.auth().currentUser;
    const signedModal = !singedin && !this.state.newUser && !this.state.retUser;
    const path = window.location.pathname;
    return (
      <div id="headerbar-main">
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
            style={{
              marginRight: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              textDecoration: "none",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", width: 180 }}>
              <div
                style={{
                  fontWeight: 600,
                  height: 80,
                  fontFamily: "Pridi",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  color: "#426CB4",
                  marginLeft: 50,
                }}
              >
                Collect
              </div>
              <div
                style={{
                  fontWeight: 600,
                  height: 80,
                  fontFamily: "Pridi",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  color: "#426CB4",
                }}
              >
                ion
              </div>
            </div>
          </Link>
          <Link
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
                height: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.searching === false && (
                <img
                  src={search}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 5,
                  }}
                />
              )}
              {this.state.searching === false && (
                <div style={{ marginRight: 30, fontWeight: 600 }}>Search</div>
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
          )}

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
                  height: 30,
                  display: "flex",
                  flexWrap: "nowrap",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  marginRight: 30,
                }}
              >
                {!this.state.city && (
                  <img
                    src={Pin}
                    style={{
                      width: 22,
                      height: 22,
                      marginRight: 5,
                    }}
                  />
                )}

                {!this.state.city && (
                  <div
                    style={{
                      fontWeight: 600,
                      flexWrap: "nowrap",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {this.state.currentLocation}
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.state.city && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 20,
                    }}
                  >
                    <Autocomplete
                      value={this.state.currentLocation}
                      id="city"
                      options={this.citiesList}
                      getOptionLabel={(option) => option}
                      style={{ width: 300 }}
                      renderOption={(option) => (
                        <div
                          onClick={() => this.updateCity(option)}
                          style={{ width: "100%", height: "80%" }}
                        >
                          {option}
                        </div>
                      )}
                      renderInput={(params) => (
                        <div>
                          <TextField
                            {...params}
                            placeholder="We addding more areas soon!"
                            label="Location"
                            variant="outlined"
                            fullWidth
                          />
                        </div>
                      )}
                      freeSolo={true}
                      style={{ width: "300px" }}
                    />
                    {/* <img
                      id="close"
                      onClick={() => this.setCity()}
                      src={Close}
                      style={{
                        width: 20,
                        height: 20,
                        marginLeft: 10,
                        marginRight: 10
                      }}
                    /> */}
                  </div>
                )}
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
            <div style={{ fontWeight: 600 }}>About</div>
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
            <div style={{ fontWeight: 600 }}>Profile</div>
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
                color: "green",
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
    // var myUid = null;
    // if (firebase.auth().currentUser) {
    //   myUid = firebase.auth().currentUser.uid;
    // } else if (localStorage.getItem("tempUid")) {
    //   myUid = localStorage.getItem("tempUid");
    // }
    // if (myUid) {
    //   firebase
    //     .firestore()
    //     .collection("Users")
    //     .doc(myUid)
    //     .update({
    //       city: city,
    //     })
    //     .then(() => {
    //       this.setState({
    //         currentCity: city,
    //       });
    //     });
    // }
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
