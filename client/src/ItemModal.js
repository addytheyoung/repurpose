import React from "react";
import Close from "./images/close.png";

export default class ItemModal extends React.Component {
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
    var modalPicture = null;
    itemDiscount = 1 - item.current_price;
    itemCurrentPrice = item.original_price - item.original_price * itemDiscount;
    // See if we need decimals for the original price
    if (item.original_price % 1 == 0) {
      showDecimalsOriginal = false;
    }
    // See if ywe need decimals for the current price
    if (itemCurrentPrice % 1 == 0) {
      showDecimalsCurrent = false;
    }
    modalPicture = item.pictures[this.state.currentPictureIndex];
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",

          // alignItems: "center"
        }}
      >
        <div
          onClick={() => closeModal()}
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
            width: "65vw",
            borderRadius: 5,
            height: "85vh",
            top: 30,
            backgroundColor: "#f5f5f5",
            position: "fixed",
            zIndex: 100,
            opacity: 1,
            overflowY: "scroll",
            overflowX: "hidden",
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
                onClick={() => closeModal()}
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
                    src={modalPicture}
                    style={{
                      maxWidth: 440,
                      maxHeight: 400,
                      minWidth: 220,
                      minHeight: 200,
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
                      fontFamily: "Gill Sans",
                      padding: 10,
                    }}
                  >
                    {item.title}
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
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      // alignItems: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <div
                      onClick={() => addToCart(item)}
                      id="add-to-cart"
                      style={{
                        backgroundColor: "#426CB4",
                        marginTop: 30,
                        borderRadius: 5,
                        padding: 10,
                        maxWidth: 200,
                        minWidth: 150,
                        height: "5vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontWeight: 500,
                      }}
                    >
                      {!addingToCart && "ADD TO CART"}
                      {addingToCart && "Adding..."}
                    </div>
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
                marginLeft: 20,
                marginRight: 20,
                borderTopColor: "#a1a1a1",
                borderTopWidth: 1,
                borderTopStyle: "solid",
                marginBottom: "10vh",
              }}
            >
              {item.description && (
                <div
                  style={{
                    marginTop: 5,
                    fontFamily: "Gill Sans",
                    fontSize: 20,
                  }}
                >
                  {item.description}
                </div>
              )}
              {!item.description && (
                <div style={{ marginTop: 5, fontFamily: "Gill Sans" }}>
                  No description
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  changeModalImg(pictureIndex) {
    this.setState({
      modalPictureIndex: pictureIndex,
    });
  }
}
