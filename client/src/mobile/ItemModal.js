import React, { Component } from "react";
import Div100vh from "react-div-100vh";
import Close from "../images/close.png";
import checkEmail from "../global_methods/checkEmail";
import api from "../api";

export default class ItemModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPictureIndex: 0,
      question: false,
    };
  }

  render() {
    const { item, closeModal, addToCart, addingToCart } = this.props;

    // Set the modal variables
    var itemDiscount = -1;
    var itemCurrentPrice = -1;
    var showDecimalsOriginal = true;
    var showDecimalsCurrent = true;
    if (item) {
      itemDiscount = 1 - item.current_price;
      itemCurrentPrice =
        item.original_price - item.original_price * itemDiscount;
      // See if we need decimals for the original price
      if (item.original_price % 1 == 0) {
        showDecimalsOriginal = false;
      }
      // See if ywe need decimals for the current price
      if (itemCurrentPrice % 1 == 0) {
        showDecimalsCurrent = false;
      }
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          zIndex: 200,
          // alignItems: "center"
        }}
      >
        <Div100vh
          style={{
            width: "100vw",
            borderRadius: 5,
            position: "fixed",
            overflowY: "scroll",
            height: "100vh",
            top: 0,
            backgroundColor: "#f5f5f5",
            // position: "absolute",
            zIndex: 200,
            opacity: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  marginTop: 20,
                  textAlign: "center",
                  padding: 10,
                  width: "65vw",
                  minHeight: 20,
                  fontFamily: "Gill Sans",
                }}
              >
                {item.title}
              </div>
              <img
                id="close"
                onClick={() => closeModal()}
                src={Close}
                style={{
                  width: "4vh",
                  height: "4vh",
                  top: "3vh",
                  right: "3vh",
                  position: "fixed",
                }}
              />
            </div>

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
                  alignItems: "center",
                }}
              >
                <div style={{}}>
                  <img
                    src={item.pictures[this.state.currentPictureIndex]}
                    style={{
                      borderRadius: 3,
                      width: "80vw",
                      height: "72vw",
                      marginTop: 20,
                    }}
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
                  {item.pictures.map((pic, index) => {
                    if (item.pictures.length == 1) {
                      return;
                    }
                    return (
                      <div
                        id="picture-map"
                        key={index}
                        onClick={() => this.changeModalImg(index)}
                      >
                        <img
                          src={pic}
                          style={{
                            width: 80,
                            height: 80 * 0.9,
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
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                        {!showDecimalsOriginal &&
                          "$" +
                            (
                              Math.round(item.original_price * 100) / 100
                            ).toFixed(0)}
                        {showDecimalsOriginal &&
                          "$" +
                            (
                              Math.round(item.original_price * 100) / 100
                            ).toFixed(2)}
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
                        {Math.round(itemDiscount * 100).toFixed(0) + "% off"}
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
                    {!showDecimalsCurrent &&
                      "$" +
                        (Math.round(itemCurrentPrice * 100) / 100).toFixed(0)}
                    {showDecimalsCurrent &&
                      "$" +
                        (Math.round(itemCurrentPrice * 100) / 100).toFixed(2)}
                  </div>

                  <div
                    onClick={() => addToCart(item)}
                    id="add-to-cart"
                    style={{
                      backgroundColor: "#426CB4",
                      marginTop: 20,
                      borderRadius: 5,
                      padding: 10,
                      width: 300,

                      height: "7vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: 22,
                    }}
                  >
                    {!this.state.addingToCart && "ADD TO CART"}
                    {this.state.addingToCart && "Adding..."}
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
                fontFamily: "Gill Sans",
              }}
            >
              Item Details
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 18,
                marginLeft: 20,
                marginRight: 20,
                borderTopColor: "#a1a1a1",
                borderTopWidth: 1,
                borderTopStyle: "solid",
              }}
            >
              <div
                style={{ marginTop: 5, fontSize: 18, fontFamily: "Gill Sans" }}
              >
                {item.description ? item.description : "No description."}
              </div>

              <div style={{ height: "20vh" }}></div>
            </div>
          </div>
        </Div100vh>
      </div>
    );
  }

  changeModalImg(pictureIndex) {
    this.setState({
      currentPictureIndex: pictureIndex,
    });
  }

  activeQuestion() {
    this.setState({
      question: true,
    });
  }

  sendMessage() {
    const email = document.getElementById("email-input").value;
    const message = document.getElementById("message-input").value.trim();

    if (!checkEmail(email)) {
      return;
    }
    if (!message || message == "") {
      alert("Please put in a message!");
      return;
    }

    api.sendEmail(
      "andrew@collection.deals",
      "New item info request from: " +
        email +
        "\n\n" +
        message +
        "\n\n" +
        "Item: " +
        this.props.item.uid
    );
    this.props.closeModal();
    alert("Message sent! We'll get back soon.");
    return;
  }
}
