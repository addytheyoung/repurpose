import React from "react";
import Close from "../images/close.png";
import * as firebase from "firebase";
import { Input } from "@material-ui/core";

export default class ProfilePageMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const singedin = !!firebase.auth().currentUser;
    const signedModal = !singedin && !this.state.newUser && !this.state.retUser;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          zIndex: 101,
        }}
      >
        <div
          style={{
            width: "100vw",
            overflowY: "scroll",
            height: "91.2vh",
            zIndex: 101,
            borderRadius: 5,

            top: 0,
            backgroundColor: "#f5f5f5",
            opacity: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              id="bar"
              style={{
                display: "flex",

                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {signedModal && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20vh",
                  }}
                >
                  {this.props.redirectToCheckout && (
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: "3vh",
                      }}
                    >
                      Sign up to checkout!
                    </div>
                  )}
                  {!this.props.redirectToCheckout && (
                    <div style={{ fontSize: 18, fontWeight: 700 }}>
                      Sign up / sign in
                    </div>
                  )}
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    style={{ width: "60vw", marginTop: "3vh", fontSize: 16 }}
                  />
                  <div
                    onClick={() => this.startShopping()}
                    id="start-shopping"
                    style={{
                      backgroundColor: "#426CB4",
                      borderRadius: 5,
                      padding: 10,
                      height: "5vh",
                      width: "60vw",
                      fontSize: 16,
                      color: "white",
                      fontWeight: 600,
                      marginTop: "2vh",
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
                <div style={{ marginTop: "20vh" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, marginTop: 20 }}>
                    What will your password be?
                  </div>
                  <Input
                    id="pass"
                    type="password"
                    placeholder="Password"
                    style={{ width: "60vw", marginTop: "3vh", fontSize: 16 }}
                  />
                  <div
                    onClick={() => this.setPassword()}
                    id="start-shopping"
                    style={{
                      backgroundColor: "#426CB4",
                      borderRadius: 5,
                      padding: 10,
                      height: "5vh",
                      width: "60vw",
                      fontSize: 16,
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
                <div style={{ marginTop: "20vh" }}>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      Welcome back! What's your password?
                    </div>
                    <Input
                      id="pass"
                      type="password"
                      placeholder="Password"
                      style={{ width: "60vw", marginTop: "3vh", fontSize: 16 }}
                    />
                    <div
                      onClick={() => this.login()}
                      id="start-shopping"
                      style={{
                        backgroundColor: "#426CB4",
                        borderRadius: 5,
                        padding: 10,
                        height: "5vh",
                        width: "60vw",
                        fontSize: 16,
                        color: "white",
                        fontWeight: 600,
                        marginTop: "2vh",
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
                    marginTop: "20vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 20,
                    }}
                  >
                    Profile
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      onClick={() =>
                        (window.location.href = "/what-have-i-sold")
                      }
                      id="my-orders"
                      style={{
                        backgroundColor: "#a1a1a1",
                        borderRadius: 5,
                        padding: 10,
                        height: "5vh",
                        width: "20vw",
                        color: "white",
                        fontWeight: 600,
                        marginTop: 10,
                        marginBottom: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      MY SALES
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
                        backgroundColor: "#426CB4",
                        fontSize: 16,
                        borderRadius: 5,
                        padding: 10,
                        height: "5vh",
                        width: "20vw",
                        color: "white",
                        fontWeight: 600,
                        marginTop: 10,
                        marginLeft: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      LOG OUT
                    </div>
                  </div>
                </div>
              )}
              {this.state.logout && (
                <div
                  style={{
                    display: "flex",
                    marginTop: "20vh",

                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700 }}>
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
                        backgroundColor: "#426CB4",
                        borderRadius: 5,
                        padding: 10,
                        height: "5vh",
                        width: "20vw",
                        fontSize: 16,
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

  setPickup(e) {
    const value = e.target.value;
    if (value === "pickup") {
      localStorage.setItem("deliveryType", "pickup");
      this.setState({
        delivery: false,
        deliveryType: value,
      });
    } else {
      localStorage.setItem("deliveryType", "delivery");
      this.setState({
        delivery: true,
        deliveryType: value,
      });
    }
  }

  randomNumber(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
                  this.props.redirectToCheckout
                    ? (window.location.href = "/checkout")
                    : (window.location.href = "/");
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
              this.props.redirectToCheckout
                ? (window.location.href = "/checkout")
                : (window.location.href = "/");
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
        this.props.redirectToCheckout
          ? (window.location.href = "/checkout")
          : (window.location.href = "/");
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
