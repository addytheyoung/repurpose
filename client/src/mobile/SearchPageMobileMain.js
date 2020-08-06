import React from "react";
import * as firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import "../css/Shop.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Close from "../images/close.png";
import HeaderMobile from "./HeaderMobile";
import FooterMobile from "./FooterMobile";
import Div100vh from "react-div-100vh";

export default class SearchPageMobileMain extends React.Component {
  constructor(props) {
    super(props);

    const q = window.location.search;
    const urlParams = new URLSearchParams(q);
    const search = urlParams.get("search");
    const category = urlParams.get("category");
    const city = localStorage.getItem("city");

    if (category === "All Categories") {
      const categoryList = [
        "Antiques & Collectibles",
        "Art & Decoration",
        "Baby",
        "Books",
        "Clothing, Shoes, & Accessories",
        "Electronics",
        "Home",
        "Movies & Video Games",
        "Garden",
        "Sporting Goods",
        "Toys & Hobbies",
        "Everything Else",
      ];
      const firebaseCats = firebase.firestore().collection("Categories");
      var i_index = 0;
      const itemArr = [];
      for (var i = 0; i < categoryList.length; i++) {
        firebaseCats
          .doc(categoryList[i])
          .collection("All")
          .where("location", "==", city)
          .get()
          .then((allItems) => {
            i_index++;
            const allItemsDocs = allItems.docs;
            var j_index = 0;
            for (var j = 0; j < allItemsDocs.length; j++) {
              const itemData = allItemsDocs[j].data();
              // See if the search matches
              if (this.searchMatchesItem(search, itemData)) {
                itemArr.push(itemData);
              }
              if (
                j === allItemsDocs.length - 1 &&
                i_index === categoryList.length - 1
              ) {
                this.setState({
                  items: itemArr,
                  loaded: true,
                  modal: null,
                });
              }
            }
          });
      }
    }

    window.localStorage.setItem("city", city);
    // window.location.href = "/";

    this.state = {
      loaded: false,
      items: [],
      category: category,
      searchTerm: search,
      minPrice: null,
      maxPrice: null,
      modal: null,
      addingToCart: false,
      numCartItems: localStorage.getItem("cart"),
      modalPictureIndex: 0,
    };
  }

  render() {
    if (!this.state.loaded)
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

    // Set the modal variables
    var itemDiscount = -1;
    var itemCurrentPrice = -1;
    var showDecimalsOriginal = true;
    var showDecimalsCurrent = true;
    if (this.state.modal) {
      itemDiscount = 1 - this.state.modal.current_price;
      itemCurrentPrice =
        this.state.modal.original_price -
        this.state.modal.original_price * itemDiscount;
      // See if we need decimals for the original price
      if (this.state.modal.original_price % 1 == 0) {
        showDecimalsOriginal = false;
      }
      // See if ywe need decimals for the current price
      if (itemCurrentPrice % 1 == 0) {
        showDecimalsCurrent = false;
      }
    }

    return (
      <div
        style={{ overflowX: "hidden", overflowY: "scroll", height: "100vh" }}
      >
        {!this.state.loaded && (
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
        )}
        <div
          style={{
            display: !this.state.loaded ? "none" : "block",
            overflowX: "hidden",
          }}
        >
          {this.state.modal && (
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
                        fontSize: 24,
                        fontWeight: 500,
                        marginTop: 20,
                        textAlign: "center",
                        padding: 10,
                        width: "65vw",
                        minHeight: 20,
                      }}
                    >
                      {this.state.modal.title}
                    </div>
                    <img
                      id="close"
                      onClick={() => this.closeModal()}
                      src={Close}
                      style={{
                        width: "10vw",
                        height: "10vw",
                        top: 30,
                        right: 30,
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
                          src={
                            this.state.modal.pictures[
                              this.state.modalPictureIndex
                            ]
                          }
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
                        {this.state.modal.pictures.map((pic, index) => {
                          if (this.state.modal.pictures.length == 1) {
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
                        {/* <div
                        style={{
                          fontSize: 24,
                          fontWeight: 500,
                          marginTop: 10,
                          textAlign: "center",
                          padding: 10,
                        }}
                      >
                        {this.state.modal.title}
                      </div> */}

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
                                    Math.round(
                                      this.state.modal.original_price * 100
                                    ) / 100
                                  ).toFixed(0)}
                              {showDecimalsOriginal &&
                                "$" +
                                  (
                                    Math.round(
                                      this.state.modal.original_price * 100
                                    ) / 100
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
                          {!showDecimalsCurrent &&
                            "$" +
                              (
                                Math.round(itemCurrentPrice * 100) / 100
                              ).toFixed(0)}
                          {showDecimalsCurrent &&
                            "$" +
                              (
                                Math.round(itemCurrentPrice * 100) / 100
                              ).toFixed(2)}
                        </div>

                        <div
                          onClick={() => this.addToCart(this.state.modal)}
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
                      fontSize: 14,
                      marginTop: 20,
                      fontWeight: 600,
                    }}
                  >
                    Item Details
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 14,
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
                    <div style={{ height: "20vh" }}></div>
                  </div>
                </div>
              </Div100vh>
            </div>
          )}
          {/* <div style={{ position: "fixed", top: 0 }}>
            <HeaderMobile
              updateCategoryFilter={(a, b) => this.updateCategoryFilter(a, b)}
              setPriceFilter={(a, b) => this.updateFilter(a, b)}
            />
          </div> */}
          <div style={{ position: "fixed", bottom: 0, zIndex: 105 }}>
            <FooterMobile searchPage={true} />
          </div>

          <div
            style={{
              marginTop: "12vh",
              overflowX: "hidden",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    marginTop: "2vh",
                    fontSize: 20,
                    fontWeight: 500,
                    marginBottom: 15,
                    width: "80vw",
                  }}
                >
                  Items near you, delivered to your doorstep every morning.
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100vw",
                      overflowX: "hidden",
                      minHeight: "80vh",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      overflowY: "hidden",
                      marginTop: 20,
                    }}
                  >
                    {this.state.items.map((item, index) => {
                      // Show discounts, if any.
                      const discount = 1 - item.current_price;
                      const currentPrice =
                        item.original_price - item.original_price * discount;
                      var showDecimals = true;
                      if (currentPrice % 1 == 0) {
                        // It's a while number. Don't show decimals.
                        showDecimals = false;
                      }
                      const f = Math.round(discount * 100).toFixed(0);

                      return (
                        <div
                          key={index}
                          style={{
                            width: "49vw",
                            marginLeft: "0.3vw",
                            marginRight: "0.3vw",
                            marginBottom: "1vh",
                          }}
                        >
                          <div
                            onClick={() => this.itemPage(item)}
                            id="box"
                            style={{
                              width: "49vw",
                            }}
                          >
                            <img
                              src={item.pictures[0]}
                              style={{
                                width: "49vw",
                                height: "49vw",
                                borderRadius: 5,
                                overflow: "hidden",
                              }}
                            ></img>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                minHeight: 50,
                                display: "block",
                                paddingLeft: "1vw",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: 18,
                                  fontWeight: 400,
                                  maxWidth: "48vw",
                                }}
                              >
                                {item.title}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginTop: 5,
                                }}
                              >
                                <div
                                  style={{
                                    fontWeight: 600,
                                    fontSize: 20,
                                  }}
                                >
                                  {!showDecimals &&
                                    "$" +
                                      (
                                        Math.round(currentPrice * 100) / 100
                                      ).toFixed(0)}
                                  {showDecimals &&
                                    "$" +
                                      (
                                        Math.round(currentPrice * 100) / 100
                                      ).toFixed(2)}
                                </div>
                                <div
                                  style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    marginLeft: 10,
                                    color: "#cc0000",
                                    opacity:
                                      discount == 0 ? 0 : discount * 15 * 0.25,
                                  }}
                                >
                                  {f + "%"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "70vw",
                  height: "15vh",
                  justifyContent: "center",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: 500,
            marginTop: 50,
            marginBottom: 50,
          }}
        ></div>
      </div>
    );
  }

  changeModalImg(pictureIndex) {
    this.setState({
      modalPictureIndex: pictureIndex,
    });
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

  loadPage(index, pictureLength) {
    if (!this.state.loaded && index == pictureLength - 1) {
      this.setState({
        loaded: true,
      });
    }
  }

  searchMatchesItem(search, itemData) {
    const searchArr = search.split(" ");

    for (var t = 0; t < searchArr.length; t++) {
      const searchTerm = searchArr[t];
      if (
        itemData.title &&
        // Title matches directly
        itemData.title.toString().toLowerCase().includes(searchTerm)
      ) {
        return true;
      } else if (
        itemData.description &&
        itemData.description.toString().toLowerCase().includes(searchTerm)
      ) {
        return true;
      }
    }
  }

  itemPage(item) {
    this.setState({
      modal: item,
    });
  }

  closeModal(e) {
    // e.stopPropagation();
    this.setState({
      modalPictureIndex: 0,
      modal: null,
    });
  }

  addToCart(item) {
    var numCartItems = localStorage.getItem("cart");

    if (numCartItems && numCartItems != 0) {
      numCartItems = parseInt(numCartItems) + 1;
    } else {
      numCartItems = 1;
    }

    this.setState({
      addingToCart: true,
    });

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

    if (!myUid) {
      // Create a new temporary user
      const uid = this.randomNumber(20);
      localStorage.setItem("tempUid", uid);
      firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .set({
          cart: [item],
          orders: [],
          sales: [],
          temporary: true,
        })
        .then(() => {
          localStorage.setItem("cart", 1);
          this.setState({
            modalPictureIndex: 0,
            modal: null,
            addingToCart: false,
            numCartItems: 1,
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
                temporary: true,
                orders: [],
                sales: [],
              })
              .then(() => {
                firebase
                  .firestore()
                  .collection("Users")
                  .doc(myUid)
                  .get()
                  .then((me) => {
                    const myCart = me.data().cart;
                    for (var i = 0; i < myCart.length; i++) {
                      if (myCart[i].uid == item.uid) {
                        alert("Item already in your cart!");
                        this.setState({
                          modalPictureIndex: 0,

                          modal: null,
                          addingToCart: false,
                          numCartItems: numCartItems,
                        });
                        return;
                      }
                    }

                    myCart.push(item);
                    firebase
                      .firestore()
                      .collection("Users")
                      .doc(myUid)
                      .update({
                        cart: myCart,
                      })
                      .then(() => {
                        localStorage.setItem("cart", numCartItems);
                        this.setState({
                          modalPictureIndex: 0,

                          modal: null,
                          addingToCart: false,
                          numCartItems: numCartItems,
                        });
                      });
                  });
              });
          } else {
            const myCart = me.data().cart;
            for (var i = 0; i < myCart.length; i++) {
              if (myCart[i].uid == item.uid) {
                alert("Item already in your cart!");
                this.setState({
                  modalPictureIndex: 0,

                  modal: null,
                  addingToCart: false,
                  numCartItems: numCartItems,
                });
                return;
              }
            }

            myCart.push(item);
            firebase
              .firestore()
              .collection("Users")
              .doc(myUid)
              .update({
                cart: myCart,
              })
              .then(() => {
                localStorage.setItem("cart", numCartItems);
                this.setState({
                  modalPictureIndex: 0,
                  modal: null,
                  addingToCart: false,
                  numCartItems: numCartItems,
                });
              });
          }
        });
    }
  }
}
