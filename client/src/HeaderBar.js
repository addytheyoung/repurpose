import React from "react";
import { Input, MenuItem, Select, Avatar } from "@material-ui/core";
import search from "./images/research.png";
import * as firebase from "firebase";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./css/HeaderBar.css";
import Logo from "./images/test.png";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Shop from "./Shop";
import Close from "./images/close.png";
import city from "./images/architectonic.png";

export default class HeaderBar extends React.Component {
  citiesList = ["Athens, TX", "Malakoff, TX"];
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
                      width: 20,
                      height: 20,
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
                        backgroundColor: "#a1a1a1",
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
                        backgroundColor: "#a1a1a1",
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
                          backgroundColor: "#a1a1a1",
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
                    <div
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
                    </div>
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
            <div
              style={{
                width: 160,
                fontWeight: 700,
                height: 80,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 24,
                color: "#7628dd",
                marginLeft: 50,
              }}
            >
              Collection
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
              color: "black",
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
              fontWeight: path.includes("sell") ? 600 : 500,
              alignItems: "center",
              minWidth: 80,
              textDecoration: "none",
              color: "black",
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
          <div style={{ width: "100%" }}></div>
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
              <img
                src={search}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                }}
              />
              <div style={{ marginRight: 30, fontWeight: 600 }}>Search</div>
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
                }}
              >
                <Select
                  style={{ width: 126, height: 40 }}
                  id="category"
                  defaultValue={"All Categories"}
                >
                  <MenuItem value={"All Categories"}>All Categories</MenuItem>
                  <MenuItem value={"Antiques"}>Antiques</MenuItem>
                  <MenuItem value={"Art"}>Art</MenuItem>
                  <MenuItem value={"Baby"}>Baby</MenuItem>
                  <MenuItem value={"Books"}>Books</MenuItem>
                  <MenuItem value={"Cameras & Photo"}>
                    {"Cameras & Photo"}
                  </MenuItem>
                  <MenuItem value={"Cell Phones & Accessories"}>
                    {"Cell Phones & Accessories"}
                  </MenuItem>
                  <MenuItem value={"Clothing, Shoes, & Accessories"}>
                    {"Clothing, Shoes, & Accessories"}
                  </MenuItem>
                  <MenuItem value={"Coins & Paper Money"}>
                    {"Coins & Paper Money"}
                  </MenuItem>
                  <MenuItem value={"Collectibles"}>Collectibles</MenuItem>
                  <MenuItem value={"Computers & Tablets"}>
                    {"Computers & Tablets"}
                  </MenuItem>
                  <MenuItem value={"Consumer Electronics"}>
                    Consumer Electronics
                  </MenuItem>
                  <MenuItem value={"Crafts / Arts & Crafts"}>
                    {"Crafts / Arts & Crafts"}
                  </MenuItem>
                  <MenuItem value={"Dolls & Bears"}>{"Dolls & Bears"}</MenuItem>
                  <MenuItem value={"Gift Cards & Coupons"}>
                    {"Gift Cards & Coupons"}
                  </MenuItem>
                  <MenuItem value={"Health & Beauty"}>
                    {"Health & Beauty"}
                  </MenuItem>
                  <MenuItem value={"Home & Garden"}>{"Home & Garden"}</MenuItem>
                  <MenuItem value={"Jewelry & Watches"}>
                    {"Jewelry & Watches"}
                  </MenuItem>
                  <MenuItem value={"Musical Instruments & Gear"}>
                    {"Musical Instruments & Gear"}
                  </MenuItem>
                  <MenuItem value={"Pet Supplies"}>{"Pet Supplies"}</MenuItem>
                  <MenuItem value={"Pottery & Glass"}>
                    {"Pottery & Glass"}
                  </MenuItem>
                  <MenuItem value={"Sporting Goods"}>
                    {"Sporting Goods"}
                  </MenuItem>
                  <MenuItem value={"Toys & Hobbies"}>
                    {"Toys & Hobbies"}
                  </MenuItem>
                  <MenuItem value={"Everything Else"}>
                    {"Everything Else"}
                  </MenuItem>
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
                    backgroundColor: "#d1d1d1",
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
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={city}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 5,
                  }}
                />

                <div style={{ marginRight: 30, fontWeight: 600 }}>
                  {this.getCityFromAddress(this.state.currentCity)}
                </div>
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
                      value={this.state.currentCity}
                      id="combo-box-demo"
                      options={this.citiesList}
                      getOptionLabel={(option) => option}
                      style={{ width: 300 }}
                      renderOption={(option) => (
                        <div
                          onClick={() => this.updateCity(option)}
                          style={{ width: "100%", height: "1005" }}
                        >
                          {option}
                        </div>
                      )}
                      renderInput={(params) => (
                        <div>
                          <TextField
                            {...params}
                            placeholder="We add more cities every day!"
                            label="City"
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
            <ShoppingCartOutlinedIcon
              style={{ width: 25, height: 25 }}
            ></ShoppingCartOutlinedIcon>

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
    console.log(address);
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
    firebase
      .firestore()
      .collection("Users")
      .doc(email)
      .get()
      .then((user) => {
        if (!user.exists) {
          // New account, render that screen.

          this.setState({
            newUser: true,
            email: email,
          });
        } else {
          // Returning user
          this.setState({
            retUser: true,
            email: email,
          });
        }
      });
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
    firebase
      .firestore()
      .collection("Users")
      .doc("123@gmail.com")
      .update({
        city: city,
      })
      .then(() => {
        this.setState({
          currentCity: city,
        });
      });
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
        firebase
          .firestore()
          .collection("Users")
          .doc(email)
          .set({
            cart: [],
            orders: [],
            sales: [],
          })
          .then(() => {
            this.state.logout = false;
            this.state.email = false;
            this.state.newUser = false;
            this.state.retUser = false;
            this.state.profile = false;
            window.location.reload();
          });
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

  search() {
    const city = document.getElementById("combo-box-demo").value.trim();
    if (city === "" || !this.citiesList.includes(city)) {
      alert("Invalid city");
      return;
    }
    window.localStorage.setItem("city", city);
    window.location.href = "/";
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

  search() {
    alert("search");
  }

  showProfileModal() {
    this.setState({
      profile: true,
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
        this.state.logout = false;
        this.state.email = false;
        this.state.newUser = false;
        this.state.retUser = false;
        this.state.profile = false;
        window.location.href = "/";
      });
  }
}
