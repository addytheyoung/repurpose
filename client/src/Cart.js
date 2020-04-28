import React from "react";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import Art from "./images/art.jpeg";
import Close from "./images/close.png";
import Bin from "./images/bin.png";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "./css/Cart.css";

export default class Cart extends React.Component {
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
                      width: 20,
                      height: 20,
                      marginTop: 20,
                      marginRight: 20,
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
                          <div key={index}>
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
        <div>
          <HeaderBar numCartItems={this.state.numCartItems} />
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
                    {" "}
                    <div style={{ fontSize: 18 }}>{item.title}</div>
                    <div style={{ fontSize: 18, fontWeight: 500 }}>
                      {"$" + item.original_price}
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

              <div
                style={{
                  marginTop: 10,
                  width: "30vw",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RadioGroup
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
                </RadioGroup>
              </div>

              {this.state.deliveryType === "delivery" && (
                <div
                  style={{ marginTop: 10, marginBottom: 10, fontWeight: 500 }}
                >
                  {subTotal < 6 && (
                    <div>
                      - Flat fee of $2.00 for delivery. <br /> <br />
                      - Free delivery for $6.00+ orders. <br /> <br />
                      - Items are typically delivered within 12 hours. <br />{" "}
                      <br /> <br />
                    </div>
                  )}
                  {subTotal >= 6 && (
                    <div>
                      - $6.00+ order: free delivery! <br /> <br /> - Items are
                      typically delivered within 12 hours. <br /> <br />{" "}
                    </div>
                  )}
                </div>
              )}
              {this.state.deliveryType === "pickup" && (
                <div
                  style={{ marginTop: 10, marginBottom: 10, fontWeight: 500 }}
                >
                  Pickup location is 2414 Longview Street, Athens TX. We'll send
                  you an email to confirm.
                </div>
              )}

              <div
                style={{
                  width: "30vw",
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
                    backgroundColor: "#a1a1a1",
                    textDecoration: "none",
                    color: "white",
                    width: 120,
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    padding: 10,
                    fontWeight: 500,
                  }}
                >
                  CHECK OUT
                </div>
                <div
                  style={{
                    marginTop: 40,
                    fontWeight: 500,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  Item doesn't work? We can refund you!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  goToCheckout() {
    window.location.href = "/checkout";
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
      if (price >= 6) {
        return 0;
      }
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
}
