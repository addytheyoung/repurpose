import React from "react";
import HeaderBar from "./HeaderBar";
import "./css/Sell.css";
import * as firebase from "firebase";
import { Input } from "@material-ui/core";
import Close from "./images/close.png";

export default class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: false,
    };
  }
  render() {
    const singedin = !!firebase.auth().currentUser;
    const signedModal = !singedin && !this.state.newUser && !this.state.retUser;
    return (
      <div style={{}}>
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
                        backgroundColor: "#E61E4D",
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
                        backgroundColor: "#E61E4D",
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
                          backgroundColor: "#E61E4D",
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
          <HeaderBar />
        </div>
        <div style={{ margin: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 100,
              minWidth: "100vw",
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: 0 }}>
              Get rid of and get paid for clutter
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
            >
              <div
                style={{
                  height: 150,
                  width: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 20,
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  1. We get your clutter
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "#a1a1a1",
                  }}
                >
                  We come and pick up all your clutter, or items you want to
                  sell.
                </div>
              </div>
              <div
                style={{
                  height: 150,
                  width: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 20,
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  2. We take it away
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "#a1a1a1",
                  }}
                >
                  We take it all away, so you never see it again.
                </div>
              </div>
              <div
                style={{
                  height: 150,
                  width: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  3. We pay you
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "#a1a1a1",
                  }}
                >
                  We pay you in cash for everything.
                </div>
              </div>
            </div>

            {singedin && (
              <div>
                <div
                  onClick={() => this.getStarted()}
                  id="header-checkout"
                  style={{
                    display: "flex",
                    width: 150,
                    textAlign: "center",
                    textDecoration: "none",
                    backgroundColor: "#E61E4D",
                    borderRadius: 5,
                    padding: 10,
                    height: 20,
                    fontWeight: 600,
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 150,
                  }}
                >
                  GET STARTED
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    marginTop: 20,
                    marginBottom: 20,
                    textAlign: "center",
                  }}
                >
                  OR
                </div>
                <div
                  onClick={() => (window.location.href = "/become_collector")}
                  id="header-checkout"
                  style={{
                    width: 150,
                    display: "flex",
                    textAlign: "center",
                    textDecoration: "none",
                    backgroundColor: "#a1a1a1",
                    borderRadius: 5,
                    padding: 10,
                    height: 20,
                    fontWeight: 600,
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 150,
                  }}
                >
                  BECOME A COLLECTOR
                </div>
              </div>
            )}

            {!singedin && (
              <div>
                <div
                  onClick={() => this.showProfileModal()}
                  id="header-checkout"
                  style={{
                    display: "flex",
                    width: 150,
                    textAlign: "center",
                    textDecoration: "none",
                    backgroundColor: "#a1a1a1",
                    borderRadius: 5,
                    padding: 10,
                    height: 20,
                    fontWeight: 600,
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 150,
                  }}
                >
                  GET STARTED
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    marginTop: 20,
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  OR
                </div>
                <div
                  onClick={() => (window.location.href = "/become_collector")}
                  id="header-checkout"
                  style={{
                    width: 150,
                    display: "flex",
                    textAlign: "center",
                    textDecoration: "none",
                    backgroundColor: "#a1a1a1",
                    borderRadius: 5,
                    padding: 10,
                    height: 20,
                    fontWeight: 600,
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 150,
                  }}
                >
                  BECOME A COLLECTOR
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  becomeCollector() {}

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

  showProfileModal() {
    this.setState({
      profile: true,
    });
  }

  getStarted() {
    if (!firebase.auth().currentUser) {
      this.showProfileModal();
    } else {
      window.location.href = "/sell/agreement";
      return;
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
          alert("transfer data");
          // Transfer the data
          firebase
            .firestore()
            .collection("Users")
            .doc(myUid)
            .get()
            .then((me) => {
              alert(r.user.uid);
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
                  firebase
                    .auth()
                    .signInWithEmailAndPassword(email, pass)
                    .then(() => {
                      this.state.logout = false;
                      this.state.email = false;
                      this.state.newUser = false;
                      this.state.retUser = false;
                      this.state.profile = false;
                      window.location.href = "/sell/agreement";
                    });
                });
            });
        } else {
          // Make a new profile
          console.log(r.user.uid);
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
              firebase
                .auth()
                .signInWithEmailAndPassword(email, pass)
                .then(() => {
                  this.state.logout = false;
                  this.state.email = false;
                  this.state.newUser = false;
                  this.state.retUser = false;
                  this.state.profile = false;
                  window.location.href = "/sell/agreement";
                });
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
        window.location.href = "/sell/agreement";
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
