import React from "react";
import { Input, MenuItem, Select, Avatar } from "@material-ui/core";
import search from "./images/research.png";
import * as firebase from "firebase";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./css/HeaderBar.css";
import Close from "./images/close.png";
import checkEmail from "./global_methods/checkEmail";
import api from "./api";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logout: false,
      newUser: false,
      retUser: false,
      email: "",
    };
  }

  render() {
    const { closeModal, cartPage } = this.props;
    console.log(this.props);
    const singedin = !!firebase.auth().currentUser;
    const signedModal = !singedin && !this.state.newUser && !this.state.retUser;
    const path = window.location.pathname;
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => closeModal(e)}
            style={{
              backgroundColor: "#000000",
              left: 0,
              opacity: 0.5,
              zIndex: 99,
              width: "100vw",
              height: "100vh",
              position: "fixed",
            }}
          ></div>
          <div
            style={{
              // width: "30vw",
              // borderRadius: 5,
              // height: "40vh",
              // top: 30,
              // backgroundColor: "#f5f5f5",
              // position: "fixed",
              // zIndex: 100,
              // opacity: 1,
              width: "65vw",
              borderRadius: 5,
              height: "85vh",
              top: 30,
              backgroundColor: "#f5f5f5",
              position: "fixed",
              zIndex: 100,
              opacity: 1,
              overflowY: "scroll",
              overflowX: "hidden",
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
                  onClick={() => closeModal()}
                  src={Close}
                  style={{
                    width: 20,
                    height: 20,
                    marginTop: 15,
                    marginRight: 15,
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
                    marginTop: "10vh",
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: "Gill Sans",
                    }}
                  >
                    {cartPage &&
                      "Sign up to checkout! \n Your cart will be saved."}
                    {!cartPage && "Sign up / sign in"}
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
                      height: "5vh",
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
                    {"CONTINUE"}
                  </div>
                  {cartPage && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    ></div>
                  )}
                </div>
              )}
              {!singedin && this.state.newUser && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10vh",
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      marginTop: 20,
                      fontFamily: "Gill Sans",
                    }}
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
                      height: "5vh",
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
                    {window.location.pathname == "/cart" && "CHECKOUT"}
                    {window.location.pathname != "/cart" && "START SHOPPING"}
                  </div>
                </div>
              )}
              {!singedin && this.state.retUser && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10vh",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginTop: 20,
                        fontFamily: "Gill Sans",
                      }}
                    >
                      Welcome back! What's your password?
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
                        height: "5vh",
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
                    marginTop: "10vh",
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
                    onClick={() => (window.location.href = "/what-have-i-sold")}
                    id="my-orders"
                    style={{
                      backgroundColor: "rgb(55, 89, 149)",
                      borderRadius: 5,
                      padding: 10,
                      height: "5vh",
                      minWidth: 120,
                      maxWidth: 150,
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
                      height: "5vh",
                      minWidth: 120,
                      maxWidth: 150,
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
                  <div
                    style={{
                      fontSize: 22,
                      paddingLeft: "2vw",
                      fontWeight: 600,
                    }}
                  >
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
                        height: "5vh",
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
                      onClick={() => closeModal()}
                      style={{
                        marginLeft: 10,
                        backgroundColor: "#a1a1a1",
                        borderRadius: 5,
                        padding: 10,
                        height: "5vh",
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
      </div>
    );
  }

  startShopping() {
    var email = document.getElementById("email").value;
    if (email) {
      email = email.toLowerCase();
    }
    if (!checkEmail(email)) {
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

        api.sendEmail(
          "andrew@collection.deals",
          "New User Account: " + email + "\n\nAccount ID: " + r.user.uid
        );
        if (myUid) {
          // Transfer the data
          firebase
            .firestore()
            .collection("Users")
            .doc(myUid)
            .get()
            .then((me) => {
              console.log(me.data());
              const cart = me.data().cart;
              const cartUids = me.data().cart_uids;
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
                  window.location.href = this.props.redirectUrl;
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
              window.location.href = this.props.redirectUrl;
            });
        }
      })
      .catch((e) => {
        alert(e.message);
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
        window.location.href = this.props.redirectUrl;
      })
      .catch((e) => {
        alert(e.message);
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
