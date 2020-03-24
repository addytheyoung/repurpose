import React from "react";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import Art from "./images/art.jpeg";
import Close from "./images/close.png";
import Bin from "./images/bin.png";
import "./css/Cart.css";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    firebase
      .firestore()
      .collection("Users")
      .doc("aty268")
      .get()
      .then(me => {
        const myData = me.data();
        this.setState({
          loaded: true,
          myData: myData
        });
      });
    this.state = {
      loaded: false,
      myData: [],
      modal: false
    };
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div
          style={{
            position: "absolute",
            left: "45vw",
            top: 200
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
    const total = parseInt((parseInt(subTotal) + tax + shipping) * 100) / 100;
    return (
      <div>
        {this.state.modal && (
          <div
            style={{
              display: "flex",
              justifyContent: "center"
              // alignItems: "center"
            }}
          >
            <div
              onClick={e => this.closeModal(e)}
              style={{
                backgroundColor: "#000000",
                opacity: 0.5,
                zIndex: 99,
                width: "100vw",
                height: "100vh",
                position: "absolute"
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
                opacity: 1
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
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
                      marginRight: 20
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ marginLeft: 20 }}>
                      <img src={Art} style={{ width: 400, height: 400 }}></img>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: 20,
                        marginTop: 10
                      }}
                    >
                      {this.state.modal.pictures.map((pic, index) => {
                        return (
                          <div>
                            <img
                              src={Art}
                              style={{
                                width: 80,
                                height: 80,
                                marginLeft: 5,
                                marginRight: 5
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
                      justifyContent: "center"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column"
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
                          textAlign: "center"
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
                          height: "100%"
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
                    fontWeight: 600
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
                    borderTopStyle: "solid"
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
          <HeaderBar />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "5vw",
            marginRight: "5vw"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40vw"
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
                marginTop: 30
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
                    fontWeight: 500
                  }}
                >
                  SHOP NOW
                </a>
              </div>
            )}
            {this.state.myData.cart.map((item, index) => {
              return (
                <div
                  style={{
                    width: "100%",
                    height: 200,
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <div onClick={() => this.itemModal(item)}>
                    <img
                      id="box"
                      style={{
                        width: 150,
                        height: 180,
                        borderRadius: 5,
                        overflow: "hidden"
                      }}
                      src={Art}
                    ></img>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {" "}
                    <div>{item.title}</div>
                    <div>{"$" + item.original_price}</div>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50vw",
              marginLeft: 20
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
                marginTop: 30
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
                justifyContent: "space-between"
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
                justifyContent: "space-between"
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
                justifyContent: "space-between"
              }}
            >
              <div>Shipping</div>
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
                justifyContent: "space-between"
              }}
            >
              <div>Total</div>
              <div>{"$" + total}</div>
            </div>

            <div
              id="checkout"
              style={{
                marginTop: 40,
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
                fontWeight: 500
              }}
            >
              CHECK OUT
            </div>
          </div>
        </div>
      </div>
    );
  }

  itemModal(item) {
    this.setState({
      modal: item
    });
  }

  closeModal(e) {
    // e.stopPropagation();
    this.setState({
      modal: null
    });
  }

  removeFromCart(item, myData) {
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
      .doc("aty268")
      .update({
        cart: newData
      })
      .then(() => {
        window.location.reload();
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
    return 3.12;
  }
}
