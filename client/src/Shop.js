import React from "react";
import * as firebase from "firebase";
import HeaderBar from "./HeaderBar";
import ClipLoader from "react-spinners/ClipLoader";
import "./css/Shop.css";
import FilterBar from "./FilterBar";
import updatePrice from "./global_methods/updatePrice";
import Art from "./images/art.jpeg";
import { Button, Select, MenuItem, Input } from "@material-ui/core";
import Close from "./images/close.png";
import MoveItemCategory from "./scripts/MoveItemCategory";

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    const q = window.location.search;
    const urlParams = new URLSearchParams(q);
    var category = urlParams.get("category");

    category = category.substring(0, 1).toUpperCase() + category.substring(1);
    if (category === "Movies") {
      category = "Movies & Video Games";
    } else if (category === "Coins") {
      category = "Coins & Paper Money";
    } else if (category === "Art") {
      category = "Art & Decoration";
    } else if (category === "Fashion") {
      category = "Clothing, Shoes, & Accessories";
    } else if (category === "Toys") {
      category = "Toys & Games";
    } else if (category === "Sports") {
      category = "Sports & Hobbies";
    } else if (category === "Antiques") {
      category = "Antiques & Collectibles";
    } else if (category === "Health") {
      category = "Health & Beauty";
    } else if (category === "Test") {
      category = "Test";
    } else if (category == "Home") {
      category = "Home";
    } else if (category == "Garden") {
      category = "Garden";
    } else if (category == "Pet") {
      category = "Pet Supplies";
    }
    console.log(category);

    this.state = {
      loaded: false,
      items: [],
      category: category,
      minPrice: null,
      maxPrice: null,
      modal: null,
      addingToCart: false,
      numCartItems: localStorage.getItem("cart"),
      moveCategory: false,
    };

    firebase
      .firestore()
      .collection("Categories")
      .doc(category)
      .collection("All")
      .where("location", "==", localStorage.getItem("city").toString())
      .get()
      .then((items) => {
        const docs = items.docs;
        var itemArr = [];
        if (docs.length == 0) {
          this.setState({
            items: [],
            loaded: true,
            modal: null,
          });
        }
        for (var i = 0; i < docs.length; i++) {
          const data = docs[i].data();
          itemArr.push(data);
          if (i === docs.length - 1) {
            itemArr = this.shuffleArray(itemArr);
            this.setState({
              items: itemArr,
              loaded: true,
              modal: null,
            });
          }
        }
      });
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
        <div>
          <HeaderBar numCartItems={this.state.numCartItems} />
        </div>

        {this.state.movePrice && (
          <div style={{ position: "fixed", marginLeft: 20 }}>
            <div>
              <Input id="new-price" />
            </div>
            <Button onClick={() => this.newPrice()}>SEND TO PRICE</Button>
          </div>
        )}

        {this.state.moveCategory && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
            }}
          >
            <Select
              style={{
                width: "50vw",
                height: 120,
                marginTop: 10,
                height: 120,
                fontSize: 20,
                display: "flex",
                flexDirection: "column",
              }}
              id="category"
              defaultValue={"Category"}
            >
              <MenuItem style={{ marginTop: 5, height: 50 }} value={"Home"}>
                Home
              </MenuItem>
              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Art & Decoration"}
              >
                Art & Decoration
              </MenuItem>
              <MenuItem style={{ marginTop: 5, height: 50 }} value={"Baby"}>
                Baby
              </MenuItem>
              <MenuItem style={{ marginTop: 5, height: 50 }} value={"Books"}>
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
                value={"Sports & Hobbies"}
              >
                {"Sports & Hobbies"}
              </MenuItem>

              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Health & Beauty"}
              >
                {"Health & Beauty"}
              </MenuItem>

              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Pet Supplies"}
              >
                {"Pet Supplies"}
              </MenuItem>

              <MenuItem style={{ marginTop: 5, height: 50 }} value={"Test"}>
                {"Test"}
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
            <Button onClick={() => this.sendToCategory()}>
              SEND TO CATEGORY
            </Button>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FilterBar
            updateFilter={(a, b) => this.updateFilter(a, b)}
            type={this.state.category}
          />

          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginTop: 50,
              width: "100vw",
              textAlign: "center",
            }}
          >
            {this.state.category}
          </div>

          {!this.state.items ||
            (this.state.items.length === 0 && (
              <div style={{ alignSelf: "center" }}>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    textAlign: "center",
                    marginTop: 50,
                  }}
                >
                  All sold out for this category!
                </div>
                <div
                  style={{ textAlign: "center", marginTop: 10, fontSize: 18 }}
                >
                  <br />
                  We add more every hour, and Collection is less than a week
                  old.
                  <br />
                  Check back very soon!
                </div>
              </div>
            ))}

          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
                width: "70vw",
                marginLeft: 100,
                marginRight: 100,
                flexFlow: "row wrap",
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
                    onClick={() => this.itemPage(item)}
                    id="box"
                    style={{
                      width: 220,
                      marginLeft: 10,
                      marginRight: 10,
                      height: 300,

                      // borderWidth: 1,
                      // borderStyle: "solid"
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
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: 18, fontWeight: 400 }}>
                        {item.title}
                      </div>
                      <div style={{ marginTop: 5, fontWeight: 600 }}>
                        {"$" + item.original_price}
                      </div>
                      {firebase.auth().currentUser &&
                        firebase.auth().currentUser.uid ==
                          "q2SYPrnJwNhaC3PcMhE3LTZ1AIv1" && (
                          <div style={{ display: "flex" }}>
                            <Button
                              onClick={(e) => this.moveCategories(e, item)}
                            >
                              Move Categories
                            </Button>
                            <Button onClick={(e) => this.changePrice(e, item)}>
                              Price
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  newPrice() {
    const price = parseInt(document.getElementById("new-price").value);
    if (!price) {
      return;
    }

    updatePrice(this.state.movingItem, price, this.state.category);
  }

  changePrice(e, item) {
    e.stopPropagation();
    if (this.state.movingItem == item) {
      this.setState({
        moveCategory: false,
        movingItem: false,
        movePrice: false,
      });
    } else {
      this.setState({
        movePrice: true,
        movingItem: item,
        moveCategory: false,
      });
    }
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  sendToCategory() {
    const category = document.getElementById("category").innerText;
    if (!category) {
      return;
    }
    MoveItemCategory(this.state.category, category, this.state.movingItem);
  }

  moveCategories(e, item) {
    e.stopPropagation();
    if (this.state.movingItem == item) {
      this.setState({
        moveCategory: false,
        movingItem: false,
        movePrice: false,
      });
    } else {
      this.setState({
        moveCategory: true,
        movingItem: item,
        movePrice: false,
      });
    }
  }

  updateFilter(min, max) {
    min = min.substring(1, min.length);
    max = max.substring(1, max.length);
    this.setState({
      minPrice: min,
      maxPrice: max,
    });
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
}
