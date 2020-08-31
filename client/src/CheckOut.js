import React from "react";
import HeaderBar from "./HeaderBar";
import { Input } from "@material-ui/core";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as firebase from "firebase";

import FormLabel from "@material-ui/core/FormLabel";
import CheckoutForm from "./CheckoutForm";
import Art from "./images/art.jpeg";
import Close from "./images/close.png";
import Bin from "./images/bin.png";
import api from "./api";
import LoadingPage from "./LoadingPage";
import Treasure from "./images/treasureGIMP.png";
import PaymentTypePage from "./PaymentTypePage";

export default class CheckOut extends React.Component {
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
        <div>
          <LoadingPage />
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
          }}
        >
          <HeaderBar />
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
          <div style={{ marginTop: 50, fontWeight: 500, fontSize: 22 }}>
            Success! Your order is complete, and you've been sent an email! Your
            items will be delivered in the next 24 hours. <br />
            <br />
          </div>
          <div>
            Call the number in your emailed reciept if any issues or concerns
            occour.
          </div>
        </div>
      );
    }

    var itemDiscount = -1;
    var itemCurrentPrice = -1;
    if (this.state.modal) {
      itemDiscount = 1 - this.state.modal.current_price;
      itemCurrentPrice =
        this.state.modal.original_price -
        this.state.modal.original_price * itemDiscount;
    }

    return (
      <div style={{ overflowY: "scroll", height: "100vh" }}>
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
                width: "60vw",
                minWidth: this.innerWidth * 0.6,
                borderRadius: 5,
                position: "fixed",
                height: "80vh",
                top: 30,
                backgroundColor: "#f5f5f5",
                // position: "absolute",
                zIndex: 100,
                opacity: 1,
              }}
            >
              \
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
                      width: 20,
                      height: 20,
                      marginTop: 15,
                      marginRight: 15,
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
                        style={{
                          fontSize: 22,
                          fontWeight: 500,
                          marginTop: 30,
                          textAlign: "center",
                          padding: 10,
                        }}
                      >
                        {this.state.modal.title}
                      </div>

                      {Math.round(itemDiscount * 100).toFixed(0) != 0 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              marginTop: 10,
                              fontWeight: 500,
                              fontSize: 22,
                              textAlign: "center",
                              textDecoration: "line-through",
                            }}
                          >
                            {"$" +
                              (
                                Math.round(
                                  this.state.modal.original_price * 10
                                ) / 10
                              ).toFixed(1)}
                          </div>
                          <div
                            style={{
                              fontWeight: 400,
                              fontSize: 16,
                              marginLeft: 10,
                              color: "#cc0000",
                              textAlign: "center",
                              marginTop: 10,
                            }}
                          >
                            {Math.round(itemDiscount * 100).toFixed(0) +
                              "% off"}
                          </div>
                        </div>
                      )}

                      <div
                        style={{
                          marginTop: 30,
                          fontWeight: 700,
                          fontSize: 24,
                          textAlign: "center",
                        }}
                      >
                        {"$" +
                          (Math.round(itemCurrentPrice * 10) / 10).toFixed(1)}
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

        <div
          id="close"
          onClick={() => (window.location.href = "/")}
          style={{
            textDecoration: "none",
            marginTop: 10,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", width: 100 }}>
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
          <img
            style={{ width: 50, height: 50, marginLeft: 0 }}
            src={Treasure}
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "5vw",
            marginRight: "5vw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40vw",
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
              return (
                <div
                  style={{
                    width: "100%",
                    height: 200,
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
                      marginLeft: 10,
                    }}
                  >
                    <div>{item.title}</div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <div style={{ fontSize: 20, fontWeight: 600 }}>
                        {"$" + (Math.round(currentPrice * 10) / 10).toFixed(1)}
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
                    style={{ marginLeft: 50, width: 35, height: 35 }}
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
                width: "50vw",
                marginLeft: 20,
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
                  justifyContent: "space-between",
                }}
              >
                <div>Total</div>
                <div>{"$" + total}</div>
              </div>
              <div style={{ marginTop: 20 }}></div>

              <div
                style={{
                  width: "30vw",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <RadioGroup
                  value={this.state.deliveryType}
                  onChange={(e) => this.setPickup(e)}
                  defaultValue="pickup"
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  <FormControlLabel
                    disabled
                    value="pickup"
                    control={<Radio color="primary" />}
                    label="Pickup (Coming soon!)"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="delivery"
                    control={<Radio color="primary" />}
                    label="Delivery"
                    labelPlacement="top"
                  />
                </RadioGroup> */}
              </div>

              {
                // If we aren't a stripe customer, render the credti card page. Else, just show the pay button
              }
              {signedIn && (
                <ElementsConsumer>
                  {({ elements, stripe }) => (
                    <CheckoutForm
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
            </div>
          )}
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
    for (var i = 0; i < myData.cart.length; i++) {
      if (item.uid == myData.cart[i].uid) {
        // Remove that item
        newData.splice(i, 1);
        break;
      }
    }
    firebase
      .firestore()
      .collection("Users")
      .doc(myUid)
      .update({
        cart: newData,
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
