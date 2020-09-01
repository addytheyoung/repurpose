import React from "react";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";
import Art from "./images/art.jpeg";
import Close from "./images/close.png";
import Bin from "./images/bin.png";
import { Input } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "./css/Cart.css";
import Chat from "./Chat";
import LoadingPage from "./LoadingPage";
import Profile from "./Profile";
import ItemModal from "./ItemModal";

export default class Cart extends React.Component {
  innerWidth = window.innerWidth;
  constructor(props) {
    super(props);
    localStorage.setItem("deliveryType", "delivery");

    this.state = {
      loaded: false,
      myData: [],
      modal: false,
      numCartItems: localStorage.getItem("cart"),
      deliveryType: "delivery",
      delivery: true,
      signInModal: false,
      modalPictureIndex: 0,
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
        <div>
          <LoadingPage />
        </div>
      );
    }
    const singedin = !!firebase.auth().currentUser;
    const signedModal = !singedin && !this.state.newUser && !this.state.retUser;
    const path = window.location.pathname;
    const subTotal = this.getSubtotal(this.state.myData.cart);
    const tax = this.getTax(subTotal);
    const shipping = this.getShipping(subTotal);
    const total = (
      parseInt(
        parseInt(subTotal * 100) +
          parseInt(tax * 100) +
          parseInt(shipping * 100)
      ) / 100
    ).toFixed(2);

    var itemDiscount = -1;
    var itemCurrentPrice = -1;
    if (this.state.modal) {
      itemDiscount = 1 - this.state.modal.current_price;
      itemCurrentPrice =
        this.state.modal.original_price -
        this.state.modal.original_price * itemDiscount;
    }

    return (
      <div>
        {!this.state.modal && <Chat />}
        {this.state.profilePage && (
          <Profile
            redirectUrl="/checkout"
            cartPage={true}
            closeModal={() => this.closeModal()}
          />
        )}
        {this.state.modal && (
          <ItemModal
            addingToCart={this.state.addingToCart}
            item={this.state.modal}
            closeModal={() => this.closeModal()}
            addToCart={(item) => this.addToCart(item)}
          />
        )}
        <div>
          <HeaderBar numCartItems={this.state.numCartItems} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "3vw",
            marginRight: "3vw",
            overflowY: "scroll",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40vw",
              maxWidth: 450,
              //   borderWidth: 1,
              //   borderStyle: "solid"
            }}
          >
            <div
              style={{
                borderBottomColor: "#a1a1a1",
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
                paddingBottom: 10,
                marginBottom: 10,
                fontSize: 20,
                fontWeight: 600,
                marginTop: 30,
              }}
            >
              Shopping Cart
            </div>
            {this.state.myData.cart.length === 0 && (
              <div>
                <div style={{ fontSize: 24, fontWeight: 600, marginTop: 50 }}>
                  Cart is empty!
                </div>
                <a
                  href="/"
                  id="shop"
                  style={{
                    backgroundColor: "#a1a1a1",
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
              // Show discounts, if any.
              const discount = 1 - item.current_price;
              const currentPrice =
                item.original_price - item.original_price * discount;
              const f = Math.round(discount * 100).toFixed(0);

              var showDecimals = true;
              if (currentPrice % 1 == 0) {
                // It's a while number. Don't show decimals.
                showDecimals = false;
              }

              return (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    height: 200,
                    marginTop: 10,
                    marginBottom: 10,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div onClick={() => this.itemModal(item)}>
                    <img
                      id="box"
                      style={{
                        width: 220,
                        height: 200,
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
                    }}
                  >
                    <div style={{ fontSize: 18 }}>{item.title}</div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <div style={{ fontSize: 20, fontWeight: 600 }}>
                        {!showDecimals &&
                          "$" +
                            (Math.round(currentPrice * 100) / 100).toFixed(0)}
                        {showDecimals &&
                          "$" +
                            (Math.round(currentPrice * 100) / 100).toFixed(2)}
                      </div>
                      <div
                        style={{
                          fontWeight: 400,
                          fontSize: 16,
                          marginLeft: 10,
                          color: "#cc0000",
                          opacity: discount == 0 ? 0 : discount * 15 * 0.25,
                        }}
                      >
                        {f + "%"}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => this.removeFromCart(item, this.state.myData)}
                    id="bin"
                    style={{ marginLeft: 10, width: 35, height: 35 }}
                  >
                    <img src={Bin} style={{ width: 30, height: 30 }}></img>
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
                width: "30vw",
                minWidth: 300,
                marginLeft: 70,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  borderBottomColor: "#a1a1a1",
                  borderBottomStyle: "solid",
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  marginBottom: 10,
                  fontSize: 20,
                  fontWeight: 600,
                  marginTop: 30,
                  width: "30vw",
                  minWidth: 300,
                }}
              >
                Order Summary
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: 18,
                  fontWeight: 500,
                  alignItems: "center",
                  width: "30vw",
                  minWidth: 300,
                  justifyContent: "space-between",
                }}
              >
                <div>Subtotal</div>
                <div>{"$" + subTotal}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  fontWeight: 500,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "30vw",
                  minWidth: 300,
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
                  fontSize: 18,
                  fontWeight: 500,
                  alignItems: "center",
                  width: "30vw",
                  minWidth: 300,
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
                  fontSize: 18,
                  fontWeight: 600,
                  alignItems: "center",
                  width: "30vw",
                  minWidth: 300,
                  justifyContent: "space-between",
                }}
              >
                <div>Total</div>
                <div>{"$" + total}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                  flexDirection: "column",
                }}
              >
                <div
                  onClick={() => this.goToCheckout()}
                  href={"/checkout"}
                  id="checkout"
                  style={{
                    backgroundColor: "rgb(66, 108, 180)",
                    textDecoration: "none",
                    color: "white",
                    width: "30vw",
                    minWidth: 300,
                    height: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    padding: 10,
                    fontWeight: 600,
                  }}
                >
                  CHECK OUT
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  changeModalImg(pictureIndex) {
    this.setState({
      modalPictureIndex: pictureIndex,
    });
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
      const price =
        parseInt(cart[i].original_price) -
        parseInt(cart[i].original_price) * (1 - cart[i].current_price);
      totalPrice += price;
    }
    return ((totalPrice / 100) * 100).toFixed(2);
  }

  getTax(price) {
    return (parseInt(price * 0.08 * 100) / 100).toFixed(2);
  }

  getShipping(price) {
    if (this.state.deliveryType === "delivery") {
      return ((2.0 / 100) * 100).toFixed(2);
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
      modal: false,
      modalPictureIndex: 0,
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
