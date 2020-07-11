import React from "react";
import * as firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import "../css/Shop.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Close from "../images/close.png";
import HeaderMobile from "./HeaderMobile";
import FooterMobile from "./FooterMobile";

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
          // .limit(30)
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
              // Find a way to render all the items here

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
    // else {
    //   firebase
    //     .firestore()
    //     .collection("Categories")
    //     .doc(category)
    //     .collection("All")
    //     .where("location", "==", city)
    //     .get()
    //     .then((allItems) => {
    //       const docs = allItems.docs;
    //       const itemArr = [];

    //       // Filter here
    //       for (var i = 0; i < docs.length; i++) {
    //         const itemData = docs[i].data();
    //         // See if the search matches
    //         if (this.searchMatchesItem(search, itemData)) {
    //           itemArr.push(itemData);
    //         }
    //         // Find a way to render all the items here
    //         if (i === docs.length - 1) {
    //           this.setState({
    //             items: itemArr,
    //             loaded: true,
    //             modal: null,
    //           });
    //         }
    //       }
    //     });
    // }
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
    };
  }

  render() {
    if (!this.state.loaded)
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

    return (
      <div style={{ overflowX: "hidden" }}>
        {!this.state.loaded && (
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
                  position: "fixed",
                }}
              ></div>
              <div
                style={{
                  width: "100vw",
                  borderRadius: 5,
                  position: "fixed",
                  height: "100vh",
                  top: 0,
                  backgroundColor: "#f5f5f5",
                  // position: "absolute",
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
                        width: "10vw",
                        height: "10vw",
                        marginTop: 40,
                        marginRight: 40,
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
                          src={this.state.modal.pictures[0]}
                          style={{
                            borderRadius: 3,
                            width: "70vw",
                            height: "70vw",
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
                      ></div>
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
                          justifyContent: "center",
                          alignItems: "centers",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 40,
                            fontWeight: 500,
                            marginTop: 30,
                            textAlign: "center",
                            padding: 10,
                          }}
                        >
                          {this.state.modal.title}
                        </div>

                        <div
                          style={{
                            marginTop: 30,
                            fontWeight: 700,
                            fontSize: 36,
                            textAlign: "center",
                          }}
                        >
                          {"$" + this.state.modal.original_price}
                        </div>

                        <div
                          onClick={() => this.addToCart(this.state.modal)}
                          id="add-to-cart"
                          style={{
                            backgroundColor: "#426CB4",
                            marginTop: 50,
                            borderRadius: 5,
                            padding: 10,
                            width: 300,

                            height: "7vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontWeight: 600,
                            fontSize: 36,
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
                      fontSize: 36,
                      marginTop: 20,
                      fontWeight: 600,
                    }}
                  >
                    Item Details
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 32,
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 46,
                    fontWeight: 700,
                    marginBottom: 15,
                  }}
                >
                  Collection, Austin, TX
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 34,
                    fontWeight: 400,
                    marginBottom: 20,
                  }}
                >
                  All purchases are delivered to your <br />
                  doorstep in less than 24 hours!
                </div>
                {this.state.newItems &&
                  this.state.activeCategories &&
                  !this.state.activeCategories.includes(false) && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{ fontSize: 42, fontWeight: 600, marginTop: 50 }}
                      >
                        Items just added
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          id="scroll"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "98vw",
                            marginLeft: "1vw",
                            marginRight: "1vw",
                            overflowX: "scroll",
                            marginTop: 20,
                          }}
                        >
                          {this.state.newItems.map((item, index) => {
                            return (
                              <div>
                                <div
                                  key={index}
                                  onClick={() => this.itemPage(item)}
                                  id="box"
                                  style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                  }}
                                >
                                  <img
                                    src={item.pictures[0]}
                                    style={{
                                      width: "40vw",
                                      height: "40vw",
                                      borderRadius: 5,
                                      overflow: "hidden",
                                    }}
                                  ></img>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize: 18,
                                        fontWeight: 400,
                                        fontSize: 36,
                                      }}
                                    >
                                      {item.title}
                                    </div>
                                    <div
                                      style={{
                                        marginTop: 5,
                                        fontWeight: 600,
                                        fontSize: 36,
                                      }}
                                    >
                                      {"$" + item.original_price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
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
                      if (
                        (this.state.minPrice &&
                          item.original_price < this.state.minPrice) ||
                        (this.state.maxPrice &&
                          item.original_price > this.state.maxPrice)
                      ) {
                        return null;
                      }
                      var prevItemCat =
                        index == 0 ? "" : this.state.items[index - 1].category;
                      if (typeof item == "string") {
                        return (
                          <div
                            style={{
                              marginTop: "4vh",

                              marginBottom: "2vh",
                              width: "70vw",
                              textAlign: "center",
                              fontWeight: 600,
                              fontSize: 52,
                            }}
                          >
                            {item}
                          </div>
                        );
                      }
                      if (item.category == "Clothing, Shoes, & Accessories") {
                        if (this.state.activeClothingGender != "all") {
                          if (item.gender != this.state.activeClothingGender) {
                            return null;
                          }
                        }
                        if (this.state.activeClothingType != "all") {
                          if (item.type != this.state.activeClothingType) {
                            return null;
                          }
                        }
                      }
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
                                height: 100,
                                display: "block",
                              }}
                            >
                              <div style={{ fontSize: 36, fontWeight: 400 }}>
                                {item.title}
                              </div>
                              <div
                                style={{
                                  marginTop: 5,
                                  fontSize: 36,
                                  fontWeight: 600,
                                }}
                              >
                                {"$" + item.original_price}
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
                  width: "1vw",
                  height: "1vh",
                  marginTop: "10vh",
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
    if (!itemData || !itemData.title) {
      return false;
    }
    for (var t = 0; t < searchArr.length; t++) {
      const searchTerm = searchArr[t];
      if (
        // Title matches directly
        itemData.title.toString().toLowerCase().includes(searchTerm)
      ) {
        return true;
      }
      for (var i = 0; i < itemData.sub_categories.length; i++) {
        const subCategory = itemData.sub_categories[i];
        if (subCategory.includes(searchTerm)) {
          return true;
        }
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
