import React, { Component } from "react";
import * as firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import Close from "../images/close.png";
import Bin from "../images/bin.png";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import CheckOutFormMobile from "./CheckOutFormMobile";
import Treasure from "../images/treasureGIMP.png";

export default class CheckOutMobile extends Component {
  constructor(props) {
    localStorage.setItem("deliveryType", "delivery");

    super(props);
    this.state = {
      cardNumber: "",
      myData: null,
      modal: false,
      loaded: false,
      finished: false,
      deliveryType: "delivery",
      total: null,
      delivery: true,
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

    firebase
      .firestore()
      .collection("Users")
      .doc(myUid)
      .get()
      .then((me) => {
        const myData = me.data();
        this.setState({
          myData: myData,
          loaded: true,
          finished: false,
        });
      });
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

    const signedIn =
      !!firebase.auth().currentUser || localStorage.getItem("tempUid");
    if (this.state.finished) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
          }}
        >
          <a
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 100,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontFamily: "Pridi",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  color: "#426CB4",
                  height: 30,
                }}
              >
                Tate's
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontFamily: "Pridi",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  color: "#AF7366",
                  height: 30,
                }}
              >
                Crate
              </div>
            </div>
            <img style={{ width: 50, height: 50 }} src={Treasure}></img>
          </a>
          <div
            style={{
              marginTop: 50,
              fontWeight: 500,
              fontSize: 22,
              width: "90vw",
              marginLeft: "5vw",
            }}
          >
            Success! Your order is complete, and you've been emailed a reciept!
            Your items will be delivered in the next 24 hours. <br />
            <br />
          </div>
          <div style={{ width: "90vw", marginLeft: "5vw" }}>
            Call the number in the email if any issues occour. See you soon!
          </div>
        </div>
      );
    }
    return (
      <div
        style={{ height: "91.2vh", overflowY: "scroll", overflowX: "hidden" }}
      >
        {this.state.modal && (
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
                position: "absolute",
              }}
            ></div>
            <div
              style={{
                width: "50vw",
                borderRadius: 5,
                height: "80vh",
                top: 30,
                backgroundColor: "#f5f5f5",
                position: "absolute",
                zIndex: 100,
                opacity: 1,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
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
                      top: 20,
                      right: 20,
                      position: "fixed",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ marginLeft: 20 }}>
                      <img
                        src={this.state.modal.pictures[0]}
                        style={{ width: 400, height: 400 }}
                      ></img>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: 20,
                        marginTop: 10,
                      }}
                    >
                      {this.state.modal.pictures.map((pic, index) => {
                        return (
                          <div>
                            <img
                              src={pic}
                              style={{
                                width: 80,
                                height: 80,
                                marginLeft: 5,
                                marginRight: 5,
                              }}
                            ></img>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{ fontSize: 22, fontWeight: 500, marginTop: 30 }}
                      >
                        {this.state.modal.title}
                      </div>

                      <div
                        style={{
                          marginTop: 30,
                          fontWeight: 700,
                          fontSize: 24,
                          textAlign: "center",
                        }}
                      >
                        {"$" + this.state.modal.original_price}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          // alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: 20,
                    fontSize: 20,
                    marginTop: 20,
                    fontWeight: 600,
                  }}
                >
                  Item Details
                </div>
                <div
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    borderTopColor: "#a1a1a1",
                    borderTopWidth: 1,
                    borderTopStyle: "solid",
                  }}
                >
                  <div style={{ marginTop: 5 }}>
                    {this.state.modal.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <a style={{ textDecoration: "none" }} href="/">
          <div
            style={{
              fontWeight: 700,
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 26,
              color: "rgb(66, 108, 180)",
            }}
          >
            Collection
          </div>
        </a>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {this.state.myData.cart.length !== 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100vw",
                backgroundColor: "#ffffff",

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
          {signedIn && (
            <ElementsConsumer>
              {({ elements, stripe }) => (
                <CheckOutFormMobile
                  // initialDeliveryType={this.initialDeliveryType}
                  // initialTotal={this.initialTotal}

                  setShipping={(b, c, d) => this.setPickup(null, b, c, d)}
                  deliveryType={this.state.deliveryType}
                  finished={() => this.finished()}
                  total={total}
                  myData={this.state.myData}
                  elements={elements}
                  stripe={stripe}
                  signedIn={true}
                />
              )}
            </ElementsConsumer>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40vw",
              //   borderWidth: 1,
              //   borderStyle: "solid"
            }}
          >
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
          </div>
        </div>
      </div>
    );
  }

  setPickup(e, b, c, d) {
    if (b) {
      this.setState({
        delivery: c,
        deliveryType: d,
      });
      return;
    }
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

  finished() {
    this.setState({
      finished: true,
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
    if (localStorage.getItem("deliveryType") === "delivery") {
      return ((1.0 / 100) * 100).toFixed(2);
    } else {
      return ((0.0 / 100) * 100).toFixed(2);
    }
  }

  itemModal(item) {
    this.setState({
      modal: item,
    });
  }

  removeFromCart(item, myData) {
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
    var numCartItems = localStorage.getItem("cart");
    if (numCartItems) {
      numCartItems = parseInt(numCartItems) - 1;
    }
    localStorage.setItem("cart", numCartItems);
    const newData = myData.cart;
    const newItemUids = myData.cart_uids;
    for (var i = 0; i < myData.cart.length; i++) {
      if (item.uid == myData.cart[i].uid) {
        // Remove that item
        newData.splice(i, 1);
        newItemUids.splice(i, 1);
        break;
      }
    }
    firebase
      .firestore()
      .collection("Users")
      .doc(myUid)
      .update({
        cart: newData,
        cart_uids: newItemUids,
      })
      .then(() => {
        window.location.reload();
      });
  }

  closeModal(e) {
    // e.stopPropagation();
    this.setState({
      modal: null,
    });
  }

  updateCardNumber(e) {}
}
