import React from "react";
import * as firebase from "firebase";
import { Input } from "@material-ui/core";
import Close from "./images/close.png";

export default class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectUrl: props.redirectUrl,
    };
  }

  render() {
    const singedin = !!firebase.auth().currentUser;
    const signedModal = !singedin && !this.state.newUser && !this.state.retUser;
    const path = window.location.pathname;

    return (
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
            width: this.props.mobile ? "100vw" : "30vw",
            borderRadius: 5,
            height: this.props.mobile ? "100vh" : "40vh",
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
                  style={{
                    maxWidth: this.props.mobile ? "75vw" : "25vw",
                    marginTop: "1vh",
                  }}
                />
                <div
                  onClick={() => this.startShopping()}
                  id="start-shopping"
                  style={{
                    backgroundColor: "#426CB4",
                    borderRadius: 5,
                    padding: 10,
                    height: 30,
                    maxWidth: "90%",
                    color: "white",
                    fontWeight: 600,
                    marginTop: "5vh",
                    marginBottom: "1vh",
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
                <div style={{ fontSize: 20, fontWeight: 600, marginTop: 20 }}>
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
                    maxWidth: "90%",
                    color: "white",
                    fontWeight: 600,
                    marginTop: "5vh",
                    marginBottom: "1vh",
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
                  <div style={{ fontSize: 20, fontWeight: 600, marginTop: 20 }}>
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
                      maxWidth: "90%",
                      color: "white",
                      fontWeight: 600,
                      marginTop: "5vh",
                      marginBottom: "1vh",
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
                  window.location.href = this.state.redirectUrl;
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
              window.location.href = this.state.redirectUrl;
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
        window.location.href = this.state.redirectUrl;
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
    this.props.closeModal();
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
