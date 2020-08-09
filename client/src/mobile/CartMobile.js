import React from "react";
import HeaderMobile from "./HeaderMobile";
import FooterMobile from "./FooterMobile";
import Bin from "../images/bin.png";
import ClipLoader from "react-spinners/ClipLoader";
import "../css/CartMobile.css";
import AboutPageMobile from "./AboutPageMobile";
import ProfilePageMobile from "./ProfilePageMobile";
import SearchPageMobile from "./SearchPageMobile";
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
      cartPage: true,
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
            height: "100vh",
          }}
        >
          <div
            style={{
              position: "fixed",
              left: window.innerWidth / 2 - 40,
              top: "30vh",
            }}
          >
            <ClipLoader size={80} color={"#123abc"} loading={true} />
          </div>
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

    if (!this.state.cartPage) {
      return (
        <div>
          <div style={{ position: "fixed", bottom: 0, zIndex: 105 }}>
            <FooterMobile
              openPage={(page) => this.openPage(page)}
              profilePage={this.state.profilePage}
              cartPage={true}
            />
          </div>
          {this.state.aboutPage && (
            <div style={{ top: 0, height: "90vh", zIndex: 104 }}>
              <AboutPageMobile closePage={() => this.closePage()} />
            </div>
          )}
          {this.state.searchPage && (
            <SearchPageMobile closePage={() => this.closePage()} />
          )}
          {this.state.profilePage && (
            <ProfilePageMobile
              redirectToCheckout={this.state.redirectToCheckout}
              closePage={() => this.closePage()}
            />
          )}
        </div>
      );
    }

    return (
      <div style={{}}>
        <div style={{ position: "fixed", bottom: 0, zIndex: 105 }}>
          <FooterMobile
            openPage={(page) => this.openPage(page)}
            profilePage={this.state.profilePage}
            cartPage={true}
          />
        </div>
        {this.state.aboutPage && (
          <div style={{ top: 0, height: "90vh", zIndex: 104 }}>
            <AboutPageMobile closePage={() => this.closePage()} />
          </div>
        )}
        {this.state.searchPage && (
          <SearchPageMobile closePage={() => this.closePage()} />
        )}
        {this.state.profilePage && (
          <ProfilePageMobile
            redirectToCheckout={this.state.redirectToCheckout}
            closePage={() => this.closePage()}
          />
        )}
        <div>
          {this.state.myData.cart.length !== 0 && (
            <div
              onClick={() => this.goToCheckout()}
              id="checkout-mobile"
              style={{
                backgroundColor: "#426CB4",
                textDecoration: "none",
                color: "white",
                width: "98vw",
                paddingTop: "1vh",
                paddingBottom: "1vh",
                height: "7vh",
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
                zIndex: 100,
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
                overflowY: "scroll",
                overflowX: "hidden",
                height: "70vh",
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
                // Show discounts, if any.
                const discount = 1 - item.current_price;
                const currentPrice =
                  item.original_price - item.original_price * discount;
                const f = Math.round(discount * 100).toFixed(0);

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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 5,
                        }}
                      >
                        <div style={{ fontSize: 20, fontWeight: 600 }}>
                          {"$" +
                            (Math.round(currentPrice * 10) / 10).toFixed(1)}
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
                      onClick={() =>
                        this.removeFromCart(item, this.state.myData)
                      }
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
                  backgroundColor: "#fafafa",
                  position: "fixed",
                  bottom: "15vh",
                  height: "17vh",
                  marginTop: "3vh",
                  paddingBottom: "1vh",
                  paddingTop: "1vh",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: 18,
                    fontSize: 16,
                    height: "3vh",
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
                    height: "3vh",
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
                    height: "3vh",
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
                    marginTop: "2vh",
                    display: "flex",
                    flexDirection: "row",
                    fontSize: 16,
                    height: "3vh",
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
    window.location.href = "/checkout";

    // if (firebase.auth().currentUser) {
    //   window.location.href = "/checkout";

    // } else {
    //   // Bring up sign up modal
    //   this.setState({
    //     profilePage: true,
    //   });
    // }
  }

  openPage(page) {
    if (page == "homePage") {
      this.setState({
        homePage: true,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
        cartPage: false,
      });
    } else if (page == "aboutPage") {
      this.setState({
        homePage: false,
        aboutPage: true,
        searchPage: false,
        profilePage: false,
        cartPage: false,
      });
    } else if (page == "searchPage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: true,
        profilePage: false,
        cartPage: false,
      });
    } else if (page == "profilePage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: true,
        cartPage: false,
      });
    } else if (page == "cartPage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
        cartPage: true,
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
    return ((2.0 / 100) * 100).toFixed(2);
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
