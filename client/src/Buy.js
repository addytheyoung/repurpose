import React from "react";
import "./css/Buy.css";
import ClipLoader from "react-spinners/ClipLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import Close from "./images/close.png";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";
import randomizeArray from "./global_methods/randomizeArray";
import FilterBar from "./FilterBar";
import Back from "./images/back.png";
import Front from "./images/arrow.png";

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
      activeClothingType: "all",
      activeClothingGender: "all",
      newCategory: true,
      finishedLoading: false,
      appended: false,
      activeCategories: [true, true, true, true, true, true, true, true, true],
      finishedPullingItems: true,
      newItems: [],
      foundNewItems: false,
    };
    this.state.finishedPullingItems = false;
    this.pullItemsFromDatabase(this.state.activeCategories, null, true);
    this.pullNewItemsFromDatabase();
  }
  render() {
    if (!this.state.loaded || !this.state.foundNewItems) {
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
                              backgroundColor: "#426CB4",
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
              updateFilter={(a, b) => this.updateFilter(a, b)}
              updateCategoryFilter={(a, b) => this.updateCategoryFilter(a, b)}
              updateMoreFilter={(a, b) => this.updateMoreFilter(a, b)}
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
                    fontWeight: 700,
                    marginBottom: 15,
                  }}
                >
                  Items in Austin, TX
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 14,
                    fontWeight: 400,
                    marginBottom: 20,
                  }}
                >
                  Delivered to your doorstep in less than 24 hours.
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
                        style={{ fontSize: 26, fontWeight: 600, marginTop: 50 }}
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
                        <img
                          id="direction-left"
                          src={Back}
                          style={{ width: 50, height: 50 }}
                          onClick={() =>
                            this.scrollLeft(
                              document.getElementById("scroll"),
                              -300,
                              100
                            )
                          }
                        ></img>
                        <div
                          id="scroll"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "50vw",
                            overflowX: "scroll",
                            marginTop: 20,
                            marginLeft: 50,
                            marginRight: 50,
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
                                    <div
                                      style={{ fontSize: 18, fontWeight: 400 }}
                                    >
                                      {item.title}
                                    </div>
                                    <div
                                      style={{ marginTop: 5, fontWeight: 600 }}
                                    >
                                      {"$" + item.original_price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <img
                          src={Front}
                          style={{ width: 50, height: 50 }}
                          id="direction-right"
                          onClick={() =>
                            this.scrollLeft(
                              document.getElementById("scroll"),
                              300,
                              100
                            )
                          }
                        ></img>
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
                  <InfiniteScroll
                    children={this.state.items}
                    dataLength={this.state.items.length} //This is important field to render the next data
                    next={() => this.next()}
                    hasMore={!this.state.finishedLoading}
                    scrollThreshold={0.95}
                    loader={<h4></h4>}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Check back often for new items</b>
                      </p>
                    }
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
                        var prevItemCat =
                          index == 0
                            ? ""
                            : this.state.items[index - 1].category;
                        if (typeof item == "string") {
                          return (
                            <div
                              style={{
                                marginTop: 20,

                                marginBottom: 20,
                                width: "70vw",
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 26,
                              }}
                            >
                              {item}
                            </div>
                          );
                        }
                        if (item.category == "Clothing, Shoes, & Accessories") {
                          if (this.state.activeClothingGender != "all") {
                            if (
                              item.gender != this.state.activeClothingGender
                            ) {
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
                          <div>
                            {/* {this.state.activeCategories[
                              this.state.currentCategoryIndex
                            ] &&
                              item.category != prevItemCat && (
                                <div
                                  style={{
                                    marginTop: 20,
                                    paddingLeft: 20,
                                    marginBottom: 10,
                                    // width: "70vw",
                                    fontWeight: 500,
                                    fontSize: 20,
                                  }}
                                >
                                  {item.category}
                                </div>
                              )} */}
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

  updateMoreFilter(a, b) {
    console.log(a, b);
    const type = a;
    const gender = b;
    this.setState({
      activeClothingType: type,
      activeClothingGender: gender,
    });
  }

  next() {
    if (this.state.finishedPullingItems) {
      this.pullItemsFromDatabase(this.state.activeCategories);
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

  pullItemsFromDatabase(categories, reset, first) {
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
          itemArr.push(currentCategory);
          currentCategoryIndex = i;
          this.state.currentCategoryIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        console.log(categories);
        console.log(currentCategoryIndex);
        this.setState({
          finishedLoading: true,
        });
        return;
      }
    } else if (!itemArr.includes(currentCategory)) {
      if (currentCategory == "Clothing, Shoes, & Accessories") {
        console.log("here2");
      }
      itemArr.push(currentCategory);
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
        const finalDoc = allItemsDocs[allItemsDocs.length - 1];

        randomizeArray(allItemsDocs);

        for (var j = 0; j < allItemsDocs.length; j++) {
          const itemData = allItemsDocs[j].data();
        }

        if (allItems.empty) {
          if (this.state.currentCategoryIndex == categoryList.length - 1) {
            alert("2");
            this.setState({
              finishedLoading: true,
            });
          } else {
            if (this.state.currentCategoryIndex != categoryList.length - 1) {
              // if (itemArr.includes(categoryList[currentCategoryIndex + 1])) {
              //   return;
              // }
              // itemArr.push(categoryList[currentCategoryIndex + 1]);
            }
            // Go to the next category
            this.setState({
              currentCategoryIndex: currentCategoryIndex + 1,
              items: itemArr,
              loaded: true,
              newCategory: true,
              modal: null,
              finalDoc: 0,
            });
            this.state.finishedPullingItems = false;
            this.pullItemsFromDatabase(categories);
          }
        } else if (allItemsDocs.length < 20) {
          // Go to the next category

          for (var j = 0; j < allItemsDocs.length; j++) {
            const itemData = allItemsDocs[j].data();
            itemArr.push(itemData);
            // Find a way to render all the items here
            if (j === allItemsDocs.length - 1) {
              if (this.state.currentCategoryIndex != categoryList.length - 1) {
                // if (itemArr.includes(categoryList[currentCategoryIndex + 1])) {
                //   return;
                // }
                // itemArr.push(categoryList[currentCategoryIndex + 1]);
              }
              this.setState({
                items: itemArr,
                loaded: true,
                modal: null,
                finalDoc: 0,
                currentCategoryIndex: currentCategoryIndex + 1,
                newCategory: true,
                currentItemIndex:
                  this.state.currentItemIndex + allItemsDocs.length,
              });
            }
          }

          this.state.finishedPullingItems = false;
          this.pullItemsFromDatabase(categories);
        } else {
          for (var j = 0; j < allItemsDocs.length; j++) {
            const itemData = allItemsDocs[j].data();
            // See if the search matches
            itemArr.push(itemData);
            // Find a way to render all the items here
            if (j === allItemsDocs.length - 1) {
              if (
                this.state.currentCategoryIndex == 0 &&
                this.state.currentItemIndex == 0
              ) {
                // alert(categoryList[this.state.currentCategoryIndex]);
                // itemArr.unshift(categoryList[this.state.currentCategoryIndex]);
              }
              // itemArr = randomizeArray(itemArr);
              this.setState({
                items: itemArr,
                loaded: true,
                finishedPullingItems: true,
                newCategory:
                  this.state.currentCategoryIndex == 0 ? true : false,
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

  pullNewItemsFromDatabase() {
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
      "Everything Else",
    ];

    const finalArr = [];
    var i_index = 0;
    for (var i = 0; i < categoryList.length; i++) {
      const category = categoryList[i];
      firebase
        .firestore()
        .collection("Categories")
        .doc(category)
        .collection("All")
        .where("new_item", "==", true)
        .get()
        .then((allDocs) => {
          i_index++;
          if (allDocs.docs.length === 0) {
            if (i_index == categoryList.length) {
              // Found everything. Set state
              randomizeArray(finalArr);

              this.setState({
                newItems: finalArr,
                foundNewItems: true,
              });
            }
          }
          for (var j = 0; j < allDocs.docs.length; j++) {
            const doc = allDocs.docs[j];
            finalArr.push(doc.data());
            if (
              i_index == categoryList.length &&
              j == allDocs.docs.length - 1
            ) {
              randomizeArray(finalArr);

              // Found everything. Set state
              this.setState({
                newItems: finalArr,
                foundNewItems: true,
              });
            }
          }
        });
    }
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
    console.log("cleared");
    console.log(this.state.finishedLoading);
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

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  scrollLeft(element, change, duration) {
    var start = element.scrollLeft,
      currentTime = 0,
      increment = 20;

    console.log(start);
    const t = this;
    var animateScroll = function () {
      currentTime += increment;
      var val = t.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }
}
