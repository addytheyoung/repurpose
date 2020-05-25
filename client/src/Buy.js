import React from "react";
import "./css/Buy.css";
import ClipLoader from "react-spinners/ClipLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import Close from "./images/close.png";

import Antiques from "./images/antiques.jpg";
import HeaderBar from "./HeaderBar";
import Art from "./images/art.jpeg";
import Electronics from "./images/electronics.jpeg";
import Books from "./images/book.jpg";
import * as firebase from "firebase";
import Toys from "./images/toys.jpeg";
import Sports from "./images/sports.jpg";
import Fashion from "./images/shirt.jpg";
import Movie from "./images/harry.jpg";

import Garden from "./images/garden.jpg";
import Health from "./images/health.webp";
import Home from "./images/home.jpg";
import Pet from "./images/pet.jpg";
import Baby from "./images/baby.jpeg";
import FilterBar from "./FilterBar";
// import Fashion from "./images/fashion.jpg";

export default class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      currentIndex: 0,
      currentCategoryIndex: 0,
      currentItemIndex: 0,
      items: [],
      finalDoc: 0,
      finishedLoading: false,
      activeCategories: [true, true, true, true, true, true, true, true, true],
    };

    this.pullItemsFromDatabase(this.state.activeCategories);
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
    const q = window.location.search;
    const urlParams = new URLSearchParams(q);
    const category = urlParams.get("city");
    if (category) {
      localStorage.setItem("city", category);
    }

    var foundItem = false;

    return (
      <div>
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
        <div style={{ display: !this.state.loaded ? "none" : "block" }}>
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
                  width: "60vw",
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
                        marginTop: 20,
                        marginRight: 20,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ marginLeft: 20 }}>
                        <img
                          src={this.state.modal.pictures[0]}
                          style={{
                            borderRadius: 3,
                            maxWidth: 400,
                            maxHeight: 400,
                            minWidth: 200,
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

                        <div
                          style={{
                            marginTop: 100,
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
                          <div
                            onClick={() => this.addToCart(this.state.modal)}
                            id="add-to-cart"
                            style={{
                              backgroundColor: "#E61E4D",
                              marginTop: 30,
                              borderRadius: 5,
                              padding: 10,
                              width: 150,
                              marginLeft: 20,
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#ffffff",
                              fontWeight: 500,
                            }}
                          >
                            {!this.state.addingToCart && "ADD TO CART"}
                            {this.state.addingToCart && "Adding..."}
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
          <div style={{ position: "fixed", top: 0 }}>
            <HeaderBar updateFilter={(a, b) => this.updateFilter(a, b)} />
          </div>
          <div style={{ position: "fixed", top: 200 }}>
            <FilterBar
              updateCategoryFilter={(a, b) => this.updateCategoryFilter(a, b)}
            />
          </div>

          <div
            style={{
              marginLeft: "15vw",
              marginRight: "15vw",
              marginTop: 130,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* {firebase.auth().currentUser &&
                firebase.auth().currentUser.uid ==
                  "q2SYPrnJwNhaC3PcMhE3LTZ1AIv1" && (
                  <div style={{ height: 50 }}>
                    <div
                      id="orders"
                      onClick={() => (window.location.href = "/andreworders")}
                    >
                      Orders
                    </div>
                  </div>
                )} */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 32,
                    fontWeight: 800,
                    marginBottom: 20,
                  }}
                >
                  Items in Austin, TX
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <InfiniteScroll
                    children={this.state.items}
                    dataLength={this.state.items.length} //This is important field to render the next data
                    next={() =>
                      this.pullItemsFromDatabase(this.state.activeCategories)
                    }
                    hasMore={!this.state.finishedLoading}
                    scrollThreshold={0.9}
                    loader={<h4></h4>}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Check back often for new items</b>
                      </p>
                    }
                    // below props only if you need pull down functionality
                    // refreshFunction={() => alert("refresh")}
                    // pullDownToRefresh
                    // pullDownToRefreshContent={
                    //   <h3 style={{ textAlign: "center" }}>
                    //     &#8595; Pull down to refresh
                    //   </h3>
                    // }
                    // releaseToRefreshContent={
                    //   <h3 style={{ textAlign: "center" }}>
                    //     &#8593; Release to refresh
                    //   </h3>
                    // }
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "70vw",
                        minHeight: "80vh",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        marginTop: 20,
                        marginLeft: 50,
                        marginRight: 50,
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
                        return (
                          <div
                            key={index}
                            onClick={() => this.itemPage(item)}
                            id="box"
                            style={{
                              width: 220,
                              marginLeft: 10,
                              marginRight: 10,
                              height: 300,
                            }}
                          >
                            <img
                              src={item.pictures[0]}
                              style={{
                                width: 220,
                                height: 200,
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
                              <div style={{ fontSize: 18, fontWeight: 400 }}>
                                {item.title}
                              </div>
                              <div style={{ marginTop: 5, fontWeight: 600 }}>
                                {"$" + item.original_price}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </InfiniteScroll>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "70vw",
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

  checkCategory(item) {
    const itemCategory = item.category;
    const activeCategories = this.state.activeCategories;
    if (itemCategory == "Art & Decoration") {
      return activeCategories[0] == true;
    } else if (itemCategory == "Books") {
      return activeCategories[1] == true;
    } else if (itemCategory == "Clothing, Shoes, & Accessories") {
      return activeCategories[2] == true;
    } else if (itemCategory == "Electronics") {
      return activeCategories[3] == true;
    } else if (itemCategory == "Home") {
      return activeCategories[4] == true;
    } else if (itemCategory == "Garden") {
      return activeCategories[5];
    } else if (itemCategory == "Pet Supplies") {
      return activeCategories[6];
    } else if (itemCategory == "Sports & Hobbies") {
      return activeCategories[7];
    } else if (itemCategory == "Toys & Games") {
      return activeCategories[8];
    } else {
      return true;
    }
  }

  pullItemsFromDatabase(categories, reset) {
    if (reset) {
      this.state.items = [];
      this.state.currentCategoryIndex = 0;
      this.state.finalDoc = 0;
      this.state.finishedLoading = false;
    }
    const categoryList = [
      "Art & Decoration",
      "Books",
      "Clothing, Shoes, & Accessories",
      "Electronics",
      "Home",
      "Garden",
      "Pet Supplies",
      "Sports & Hobbies",
      "Toys & Games",
      // "Everything Else",
    ];

    // Keep track of an index for each category.
    // Keep track of the category we are currently on.
    // Once we get through a category, go to the next one

    const firebaseCats = firebase.firestore().collection("Categories");
    var i_index = 0;
    var itemArr = [];
    if (this.state.items) {
      itemArr = this.state.items;
    }
    var currentCategoryIndex = this.state.currentCategoryIndex;
    var currentCategory = categoryList[currentCategoryIndex];

    if (!categories[currentCategoryIndex]) {
      var found = false;
      //Loop through and find the next occourance
      for (var i = currentCategoryIndex; i < categories.length; i++) {
        if (categories[i] == true) {
          currentCategory = categoryList[i];
          currentCategoryIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        this.setState({
          finishedLoading: true,
        });
        return;
      }
    }

    firebase
      .firestore()
      .collection("Categories")
      .doc(currentCategory)
      .collection("All")
      .where("location", "==", "Austin, TX")
      .orderBy("uid")
      .limit(20)
      .startAfter(this.state.finalDoc)
      .get()
      .then((allItems) => {
        const allItemsDocs = allItems.docs;
        if (allItems.empty) {
          if (this.state.currentCategoryIndex == categoryList.length - 1) {
            this.setState({
              finishedLoading: true,
            });
          } else {
            // Go to the next category

            this.setState({
              currentCategoryIndex: currentCategoryIndex + 1,
              items: itemArr,
              loaded: true,
              modal: null,
              finalDoc: 0,
            });
            this.pullItemsFromDatabase(categories);
          }
        } else if (allItemsDocs.length < 20) {
          // Go to the next category

          const finalDoc = allItemsDocs[allItemsDocs.length - 1];
          for (var j = 0; j < allItemsDocs.length; j++) {
            const itemData = allItemsDocs[j].data();
            // See if the search matches
            itemArr.push(itemData);
            // Find a way to render all the items here
            if (j === allItemsDocs.length - 1) {
              // itemArr = randomizeArray(itemArr);
              this.setState({
                items: itemArr,
                loaded: true,
                modal: null,
                finalDoc: 0,
                currentCategoryIndex: currentCategoryIndex + 1,
                currentItemIndex:
                  this.state.currentItemIndex + allItemsDocs.length,
              });
            }
          }

          this.pullItemsFromDatabase(categories);
        } else {
          const finalDoc = allItemsDocs[allItemsDocs.length - 1];
          for (var j = 0; j < allItemsDocs.length; j++) {
            const itemData = allItemsDocs[j].data();
            // See if the search matches
            itemArr.push(itemData);
            // Find a way to render all the items here
            if (j === allItemsDocs.length - 1) {
              // itemArr = randomizeArray(itemArr);
              this.setState({
                items: itemArr,
                loaded: true,
                modal: null,
                finalDoc: finalDoc,
                currentItemIndex: this.state.currentItemIndex + 20,
              });
            }
          }
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  updateCategoryFilter(categories) {
    this.setState({
      activeCategories: categories,
      currentCategoryIndex: 0,
      finishedLoading: false,
      items: [],
      modal: null,
      finalDoc: 0,
    });
    this.pullItemsFromDatabase(categories, true);
  }

  updateFilter(min, max) {
    min = min.substring(1, min.length);
    max = max.substring(1, max.length);
    this.setState({
      minPrice: min,
      maxPrice: max,
    });
  }

  goToCategory(cat) {
    //  window.open("https://collection.deals/shop/" + cat.link, "_self");
    if (window.location.href.includes("localhost")) {
      window.open("http://localhost:3000/shop/?category=" + cat.link, "_self");
    } else {
      window.open(
        "https://collection.deals/shop/?category=" + cat.link,
        "_self"
      );
    }
  }

  loadPage(index) {
    if (!this.state.loaded && index == 5) {
      this.setState({
        loaded: true,
      });
    }
  }
}
