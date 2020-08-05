import React from "react";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";
import SignInModal from "./SignInModal";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { Input, Select, MenuItem, Button } from "@material-ui/core";
import Close from "./images/close.png";
import "./css/WhatHaveISold.css";

export default class WhatHaveISoldPage extends React.Component {
  constructor(props) {
    super(props);

    if (!firebase.auth().currentUser) {
      return;
    }

    const mySellerId = firebase.auth().currentUser.uid;
    console.log(firebase.auth().currentUser.uid);
    const allItemSold = [];
    // Go through all the orders, find the orders that contain my seller id
    firebase
      .firestore()
      .collection("Orders")
      .where("seller_array", "array-contains", mySellerId)
      .get()
      .then((mySales) => {
        // Go through each order
        mySales.docs.forEach((doc) => {
          const itemsSold = doc.data().items;
          // Find the item that was mine
          itemsSold.forEach((item) => {
            if (item.seller == mySellerId) {
              // Found the item.
              allItemSold.push(item);
            }
          });
        });

        this.setState({
          allItemSold: allItemSold,
          finishedFindingSold: true,
        });
      });

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

    const activeSeller = "JsVK7C1mHeMQg61tnB4qgkyPOik2";
    // const activeSeller = firebase.auth().currentUser.uid;
    const finalArr = [];
    var i_index = 0;
    for (var i = 0; i < categoryList.length; i++) {
      const category = categoryList[i];
      firebase
        .firestore()
        .collection("Categories")
        .doc(category)
        .collection("All")
        .where("seller", "==", activeSeller)
        .get()
        .then((allDocs) => {
          i_index++;
          if (allDocs.docs.length === 0) {
            if (i_index == categoryList.length) {
              // Found everything. Set state
              this.setState({
                unsoldItems: finalArr,
                finishedFindingUnsold: true,
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
              // Found everything. Set state
              this.setState({
                unsoldItems: finalArr,
                finishedFindingUnsold: true,
              });
            }
          }
        });
    }

    this.state = {
      allItemSold: null,
      unsoldItems: [],
      loaded: false,
      finishedFindingUnsold: false,
      finishedFindingSold: false,
    };
  }

  render() {
    if (!firebase.auth().currentUser) {
      if (isMobile) {
        return (
          <div>
            <SignInModal
              mobile={true}
              redirectUrl={"/what-have-i-sold"}
              closeModal={() => console.log("nothing")}
            />
          </div>
        );
      }
      return (
        <div>
          <SignInModal
            redirectUrl={"/what-have-i-sold"}
            closeModal={() => console.log("nothing")}
          />
        </div>
      );
    }
    if (!this.state.finishedFindingSold || !this.state.finishedFindingUnsold) {
      return null;
    }

    const allItemSold = this.state.allItemSold;
    var totalPay = 0;
    allItemSold.forEach((item) => {
      totalPay += parseInt(item.original_price * 0.4 * 100) / 100;
    });
    return (
      <div
        style={{ height: "100vh", overflowY: "scroll", overflowX: "hidden" }}
      >
        <div
          onClick={() => (window.location.href = "/")}
          style={{ display: "flex", flexDirection: "row", width: 180 }}
        >
          <div
            id="collection"
            style={{
              fontWeight: 600,
              height: 80,
              fontFamily: "Pridi",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 28,
              color: "#426CB4",
              marginLeft: 20,
            }}
          >
            Collect
          </div>
          <div
            style={{
              fontWeight: 600,
              height: 80,
              fontFamily: "Pridi",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 28,
              color: "#426CB4",
            }}
          >
            ion
          </div>
        </div>
        {this.state.activeModal && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              onClick={(e) => this.closeModal(e)}
              style={{
                backgroundColor: "#000000",
                opacity: 0.5,
                top: 0,
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
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
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
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="sellpage-change-name">Category</div>
                        <Select
                          style={{
                            width: "30vw",
                            height: 120,
                            marginTop: 10,
                            height: 40,
                            fontSize: 20,
                            display: "flex",
                            flexDirection: "column",
                          }}
                          id="category2"
                          defaultValue={this.state.activeModal.category}
                          onChange={(e) =>
                            this.setState({
                              modalCategory: e.target.value,
                            })
                          }
                        >
                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Art & Decoration"}
                          >
                            Art & Decoration
                          </MenuItem>

                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Books"}
                          >
                            Books
                          </MenuItem>

                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Clothing, Shoes, & Accessories"}
                          >
                            {"Clothing, Shoes, & Accessories"}
                          </MenuItem>

                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Electronics"}
                          >
                            Electronics
                          </MenuItem>

                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Home"}
                          >
                            Home
                          </MenuItem>
                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Garden"}
                          >
                            Garden
                          </MenuItem>

                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Pet Supplies"}
                          >
                            {"Pet Supplies"}
                          </MenuItem>

                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Test"}
                          >
                            {"Test"}
                          </MenuItem>
                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Sports & Hobbies"}
                          >
                            {"Sports & Hobbies"}
                          </MenuItem>
                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Toys & Games"}
                          >
                            {"Toys & Games"}
                          </MenuItem>
                          <MenuItem
                            style={{ marginTop: 5, height: 50 }}
                            value={"Everything Else"}
                          >
                            {"Everything Else"}
                          </MenuItem>
                        </Select>
                      </div> */}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="sellpage-change-name">Title</div>
                    <Input
                      defaultValue={this.state.activeModal.title}
                      id="title-change"
                      placeholder="Title"
                    ></Input>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="sellpage-change-name">Price</div>
                    <Input
                      defaultValue={this.state.activeModal.original_price}
                      id="price-change"
                      placeholder="Price"
                    ></Input>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="sellpage-change-name">Description</div>
                    <Input
                      multiline={true}
                      defaultValue={this.state.activeModal.description}
                      id="description-change"
                      placeholder="Description"
                    ></Input>
                  </div>
                  <div>
                    <div
                      id="update-item-soldpage"
                      onClick={() => {
                        this.updateItem();
                      }}
                    >
                      Update Item
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <div
            style={{
              marginTop: 20,
              fontSize: 24,
              fontWeight: 400,
            }}
          >
            {this.state.unsoldItems.length +
              allItemSold.length +
              " items listed"}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 24,
              fontWeight: 400,
            }}
          >
            {allItemSold.length + " items sold"}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            {"Total Pay: $" + totalPay}
          </div>
          <div style={{ marginTop: "10vh", fontSize: 26, fontWeight: 600 }}>
            Sold items
          </div>

          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {this.state.allItemSold.map((item, index) => {
              // Render the sold items
              return (
                <div
                  key={index}
                  style={{
                    marginTop: 10,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  <div style={{ fontWeight: 500 }}>
                    {"Item " + parseInt(index + 1)}
                  </div>

                  <div style={{}}>
                    <div style={{}}>
                      <img
                        style={{
                          width: 300,
                          height: 300,
                          borderRadius: 3,
                        }}
                        src={item.pictures[0]}
                      ></img>

                      <div style={{ fontWeight: 600 }}>
                        {"Your Pay: $" +
                          parseInt(item.original_price * 0.4 * 100) / 100}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "10vh", fontSize: 26, fontWeight: 600 }}>
            Unsold items
          </div>
          <div>(Click item to edit it)</div>
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
            {this.state.unsoldItems.map((item, index) => {
              if (!item) {
                return null;
              }
              // If it's a category, render that title
              if (typeof item == "string") {
                return (
                  <div
                    id="category-title"
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
              // Show discounts, if any.
              const discount = 1 - item.current_price;
              const currentPrice =
                item.original_price - item.original_price * discount;
              const f = Math.round(discount * 100).toFixed(0);

              var showDecimals = true;
              if (currentPrice % 1 == 0) {
                // It's a while number. Don't show decimals.
                showDecimals = false;
              }

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
                        borderStyle: "solid",
                        borderWidth: 3,

                        borderColor: discount == 0.8 ? " #cc0000" : "#ffffff",
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
                              (Math.round(currentPrice * 100) / 100).toFixed(0)}
                          {showDecimals &&
                            "$" +
                              (Math.round(currentPrice * 100) / 100).toFixed(2)}
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
                  </div>
                </div>
              );
            })}

            {
              // numItemsFound == 0 &&
              //   !this.state.databaseEmpty &&
              //   this.pullItemsFromDatabase(
              //     this.state.activeCategories
              //   )
              // No items were found. Keep pulling from the database until we find a match.
            }
          </div>
        </div>
      </div>
    );
  }

  updateItem() {
    var item = this.state.activeModal;
    const title = document.getElementById("title-change").value;
    const price = parseFloat(document.getElementById("price-change").value);
    const description = document.getElementById("description-change").value;

    if (price.toString().includes(".")) {
      alert("Whole numbers only.");
      return;
    } else if (!!!price) {
      alert("Please enter a number for price");
      return;
    }

    firebase
      .firestore()
      .collection("Categories")
      .doc(item.category)
      .collection("All")
      .doc(item.uid)
      .update({
        title: title,
        original_price: price,
        description: description,
      })
      .then(() => {
        this.setState({
          activeModal: null,
        });
      });
  }

  closeModal(e) {
    // e.stopPropagation();
    this.setState({
      activeModal: null,
    });
  }

  itemPage(item) {
    this.setState({
      activeModal: item,
    });
  }
}
