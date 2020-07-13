import React from "react";
import HeaderMobile from "./HeaderMobile";
import FooterMobile from "./FooterMobile";
import Bin from "../images/bin.png";
import ClipLoader from "react-spinners/ClipLoader";
import "../css/CartMobile.css";

import * as firebase from "firebase";

export default class CartMobile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      myData: [],
      modal: false,
      numCartItems: localStorage.getItem("cart"),
      deliveryType: "delivery",
      delivery: true,
      signInModal: false,
      profilePage: false,
    };

    var myUid = null;
    if (firebase.auth().currentUser) {
      // Signed in
      myUid = firebase.auth().currentUser.uid;
    } else if (localStorage.getItem("tempUid")) {
      // temporarily signed in
      myUid = localStorage.getItem("tempUid");
    } else {
      // Not signed in
      myUid = null;
    }

    var temporary = true;
    if (firebase.auth().currentUser) {
      temporary = false;
    }

    if (!myUid) {
      const uid = this.randomNumber(20);
      localStorage.setItem("tempUid", uid);
      firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .set({
          cart: [],
          orders: [],
          sales: [],
          temporary: temporary,
        })
        .then(() => {
          localStorage.setItem("cart", 0);
          this.setState({
            loaded: true,
            myData: { cart: [], orders: [], sales: [] },
            numCartItems: 0,
          });
        });
    } else {
      firebase
        .firestore()
        .collection("Users")
        .doc(myUid)
        .get()
        .then((me) => {
          if (!me.exists) {
            firebase
              .firestore()
              .collection("Users")
              .doc(myUid)
              .set({
                cart: [],
                orders: [],
                sales: [],
                temporary: temporary,
              })
              .then(() => {
                this.setState({
                  loaded: true,
                  myData: { cart: [], orders: [], sales: [] },
                  numCartItems: 0,
                });
              });
          } else {
            console.log(me);
            console.log(me.data());
            const myData = me.data();
            var numItems = 0;
            if (myData.cart) {
              numItems = myData.cart.length;
            }
            localStorage.setItem("cart", numItems);
            this.setState({
              loaded: true,
              myData: myData,
              numCartItems: numItems,
            });
          }
        });
    }
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div
          style={{
            position: "absolute",
            left: "45vw",
            top: 200,
          }}
        >
          <ClipLoader
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }
    const singedin = !!firebase.auth().currentUser;
    const signedModal = !singedin && !this.state.newUser && !this.state.retUser;
    const path = window.location.pathname;
    const subTotal = this.getSubtotal(this.state.myData.cart);
    const tax = this.getTax(subTotal);
    const shipping = this.getShipping(subTotal);
    const total =
      parseInt(
        parseInt(subTotal * 100) +
          parseInt(tax * 100) +
          parseInt(shipping * 100)
      ) / 100;

    return (
      <div>
        {/* <div style={{ position: "fixed", top: 0 }}>
          <HeaderMobile
            updateCategoryFilter={(a, b) => this.updateCategoryFilter(a, b)}
            setPriceFilter={(a, b) => this.updateFilter(a, b)}
          />
        </div> */}
        <div style={{ position: "fixed", bottom: 0, zIndex: 105 }}>
          <FooterMobile profilePage={this.state.profilePage} cartPage={true} />
        </div>
        {this.state.myData.cart.length !== 0 && (
          <div
            onClick={() => this.goToCheckout()}
            id="checkout-mobile"
            style={{
              backgroundColor: "#426CB4",
              textDecoration: "none",
              color: "white",
              width: "98vw",
              paddingTop: 10,
              paddingBottom: 10,
              height: "4vh",
              bottom: "9vh",
              left: "1vw",
              // right: "1vw",
              position: "fixed",
              fontSize: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              // padding: 10,
              fontWeight: 700,
            }}
          >
            CHECK OUT
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100vw",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderBottomColor: "#a1a1a1",
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
                paddingBottom: 10,
                width: "100vw",
                textAlign: "center",
                marginBottom: 10,
                fontSize: 20,
                fontWeight: 600,
                marginTop: 30,
              }}
            >
              Cart
            </div>
            {this.state.myData.cart.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 50 }}>
                  Cart is empty!
                </div>
                <a
                  href="/"
                  id="shop"
                  style={{
                    backgroundColor: "#426CB4",
                    textDecoration: "none",
                    color: "white",
                    width: 120,
                    marginTop: 30,
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    padding: 10,
                    fontWeight: 500,
                  }}
                >
                  SHOP NOW
                </a>
              </div>
            )}
            {this.state.myData.cart.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    marginTop: 10,
                    width: "80vw",
                    marginBottom: 10,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div onClick={() => this.itemModal(item)}>
                    <img
                      id="box"
                      style={{
                        width: "40vw",
                        height: "40vw",
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                      src={item.pictures[0]}
                    ></img>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: 10,
                      width: "26vw",
                    }}
                  >
                    <div style={{ fontSize: 16 }}>{item.title}</div>
                    <div style={{ fontSize: 16, fontWeight: 500 }}>
                      {"$" + item.original_price}
                    </div>
                  </div>
                  <div
                    onClick={() => this.removeFromCart(item, this.state.myData)}
                    id="bin"
                    style={{ marginLeft: "5vw", width: 35, height: 35 }}
                  >
                    <img
                      src={Bin}
                      style={{ width: "5vw", height: "5vw" }}
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
          {this.state.myData.cart.length !== 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100vw",
                backgroundColor: "#ffffff",
                position: "fixed",
                bottom: "17vh",
                marginTop: "3vh",
                paddingBottom: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: 18,
                  fontSize: 16,
                  fontWeight: 500,
                  alignItems: "center",
                  width: "96vw",
                  justifyContent: "space-between",
                }}
              >
                <div>Subtotal</div>
                <div>{"$" + subTotal}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 16,
                  fontWeight: 500,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "96vw",
                  justifyContent: "space-between",
                }}
              >
                <div>Tax</div>
                <div>{"$" + tax}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: 16,
                  fontWeight: 500,
                  alignItems: "center",
                  width: "96vw",
                  justifyContent: "space-between",
                }}
              >
                <div>Delivery</div>
                <div>{"$" + shipping}</div>
              </div>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "row",
                  fontSize: 16,
                  fontWeight: 600,
                  alignItems: "center",
                  width: "96vw",
                  justifyContent: "space-between",
                }}
              >
                <div>Total</div>
                <div>{"$" + total}</div>
              </div>
            </div>
          )}
          <div style={{ height: "30vh" }}></div>
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

  goToCheckout() {
    if (firebase.auth().currentUser) {
      window.location.href = "/checkout";
    } else {
      // Bring up sign up modal
      this.setState({
        profilePage: true,
      });
    }
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

  itemModal(item) {
    this.setState({
      modal: item,
    });
  }

  closeModal(e) {
    // e.stopPropagation();
    this.setState({
      modal: null,
    });
  }

  removeFromCart(item, myData) {
    var numCartItems = localStorage.getItem("cart");
    if (numCartItems) {
      numCartItems = parseInt(numCartItems) - 1;
    }

    const newData = myData.cart;
    for (var i = 0; i < myData.cart.length; i++) {
      if (item.uid == myData.cart[i].uid) {
        // Remove that item
        newData.splice(i, 1);
        break;
      }
    }

    var myUid = null;
    if (firebase.auth().currentUser) {
      // Signed in
      myUid = firebase.auth().currentUser.uid;
    } else if (localStorage.getItem("tempUid")) {
      // temporarily signed in
      myUid = localStorage.getItem("tempUid");
    } else {
      // Not signed in
      myUid = null;
    }

    firebase
      .firestore()
      .collection("Users")
      .doc(myUid)
      .update({
        cart: newData,
      })
      .then(() => {
        localStorage.setItem("cart", numCartItems);
        this.setState({
          numCartItems: numCartItems,
        });
        // window.location.reload();
      });
  }

  getSubtotal(cart) {
    var totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
      const price = cart[i].original_price;
      totalPrice += price;
    }
    return ((totalPrice / 100) * 100).toFixed(2);
  }

  getTax(price) {
    return parseInt(price * 0.08 * 100) / 100;
  }

  getShipping(price) {
    if (this.state.deliveryType === "delivery") {
      return ((1.5 / 100) * 100).toFixed(2);
    } else {
      return ((0.0 / 100) * 100).toFixed(2);
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
                  window.location.href = "/checkout";
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
              window.location.href = "/checkout";
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
        window.location.href = "/checkout";
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
