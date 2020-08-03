import React from "react";
import * as firebase from "firebase";
import HeaderBar from "./HeaderBar";
import { Input, Select, MenuItem, Button } from "@material-ui/core";
import Close from "./images/close.png";
import MoveItemCategory from "./scripts/MoveItemCategory";

export default class AndrewItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSeller: "8dXpQZIgYJRV7Zhc3DNuC6KduZf2",
      activeCategory: null,
      activeItems: [],
      activeModal: null,
      modalCategory: null,
    };
    // Filters: Seller, Category
  }

  //8dXpQZIgYJRV7Zhc3DNuC6KduZf2

  render() {
    if (firebase.auth().currentUser.uid != "q2SYPrnJwNhaC3PcMhE3LTZ1AIv1") {
      alert("Bad user!");
      return null;
    }
    var total = 0;
    for (var i = 0; i < this.state.activeItems.length; i++) {
      total += parseInt(this.state.activeItems[i].original_price);
    }
    return (
      <div style={{ height: "100vh", overflowY: "scroll" }}>
        {this.state.activeModal && (
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
                    <div>
                      <Button
                        onClick={() => {
                          this.changeCategory();
                        }}
                      >
                        Category
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          this.changeSeller();
                        }}
                      >
                        Seller
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          this.changeTitle();
                        }}
                      >
                        Title
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          this.changePrice();
                        }}
                      >
                        Price
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          this.changeSale();
                        }}
                      >
                        % Off
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          this.changeDescription();
                        }}
                      >
                        Description
                      </Button>
                    </div>

                    <div style={{ marginTop: 20 }}>
                      <Button
                        onClick={() => {
                          this.deleteItem();
                        }}
                      >
                        DELETE
                      </Button>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Select
                          style={{
                            width: "20vw",
                            height: 120,
                            marginTop: 10,
                            marginLeft: 50,
                            height: 120,
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
                      </div>
                    </div>
                    <div>
                      <Input
                        defaultValue={this.state.activeModal.uid}
                        placeholder="ID"
                      ></Input>
                    </div>
                    <div>
                      <Input
                        defaultValue={this.state.activeModal.seller}
                        id="seller-change"
                        placeholder="Seller"
                      ></Input>
                    </div>
                    <div>
                      <Input
                        defaultValue={this.state.activeModal.title}
                        id="title-change"
                        placeholder="Title"
                      ></Input>
                    </div>
                    <div>
                      <Input
                        defaultValue={this.state.activeModal.original_price}
                        id="price-change"
                        placeholder="Price"
                      ></Input>
                    </div>
                    <div>
                      <Input
                        defaultValue={this.state.activeModal.current_price}
                        id="sale-change"
                        placeholder="Current Price"
                      ></Input>
                    </div>
                    <div>
                      <Input
                        multiline={true}
                        defaultValue={this.state.activeModal.description}
                        id="description-change"
                        placeholder="Description"
                      ></Input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Select
              style={{
                width: "20vw",
                height: 120,
                marginTop: 10,
                marginLeft: 50,
                height: 120,
                fontSize: 20,
                display: "flex",
                flexDirection: "column",
              }}
              id="category2"
              defaultValue={"Category"}
              onChange={(e) =>
                this.setState({
                  activeCategory: e.target.value,
                })
              }
            >
              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Art & Decoration"}
              >
                Art & Decoration
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

              <MenuItem style={{ marginTop: 5, height: 50 }} value={"Home"}>
                Home
              </MenuItem>
              <MenuItem style={{ marginTop: 5, height: 50 }} value={"Garden"}>
                Garden
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
          </div>
          <Input
            id="seller"
            style={{ marginLeft: 50 }}
            placeholder="Seller"
            defaultValue={this.state.activeSeller}
          ></Input>
          <Button onClick={() => this.filterForItems()}>FIND</Button>
          <div> {total}</div>
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
            {this.state.activeItems.map((item, index) => {
              const discount = 1 - item.current_price;
              const currentPrice =
                item.original_price - item.original_price * discount;

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
                    <div
                      style={{
                        marginTop: 5,
                        fontWeight: 600,
                        fontSize: 20,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginTop: 5, fontWeight: 600 }}>
                        {"$" +
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
                        {Math.round(discount * 100).toFixed(0) + "%"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  itemPage(item) {
    this.setState({
      activeModal: item,
    });
  }

  filterForItems() {
    console.log("filtering");
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
    const activeCategory = this.state.activeCategory;
    const activeSeller = document.getElementById("seller").value;

    if (!activeCategory && !activeSeller) {
    } else if (!activeCategory && activeSeller) {
      // Just filter with the seller id
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
                  activeItems: finalArr,
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
                  activeItems: finalArr,
                });
              }
            }
          });
      }
    } else if (!activeSeller && activeCategory) {
      // Just filter with the category
      const finalArr = [];
      firebase
        .firestore()
        .collection("Categories")
        .doc(activeCategory)
        .collection("All")
        .get()
        .then((allDocs) => {
          if (allDocs.docs.length === 0) {
            this.setState({
              activeItems: [],
            });
          }
          for (var j = 0; j < allDocs.docs.length; j++) {
            const doc = allDocs.docs[j];
            finalArr.push(doc.data());
            if (j == allDocs.docs.length - 1) {
              this.setState({
                activeItems: finalArr,
              });
            }
          }
        });
    } else {
      // Filter with both seller id and category
      const finalArr = [];
      firebase
        .firestore()
        .collection("Categories")
        .doc(activeCategory)
        .collection("All")
        .where("seller", "==", activeSeller)
        .get()
        .then((allDocs) => {
          if (allDocs.docs.length === 0) {
            this.setState({
              activeItems: [],
            });
          }
          for (var j = 0; j < allDocs.docs.length; j++) {
            const doc = allDocs.docs[j];
            finalArr.push(doc.data());
            if (j == allDocs.docs.length - 1) {
              this.setState({
                activeItems: finalArr,
              });
            }
          }
        });
    }
  }

  closeModal(e) {
    // e.stopPropagation();
    this.setState({
      activeModal: null,
    });
  }

  changeSale() {
    var item = this.state.activeModal;
    const currentPrice = parseFloat(
      document.getElementById("sale-change").value
    );
    if (!currentPrice) {
      return;
    }
    firebase
      .firestore()
      .collection("Categories")
      .doc(item.category)
      .collection("All")
      .doc(item.uid)
      .update({
        current_price: currentPrice,
      })
      .then(() => {
        this.setState({
          activeModal: null,
        });
      });
  }

  changeCategory() {
    var item = this.state.activeModal;
    const oldCategory = item.category;
    const newCategory = this.state.modalCategory;
    item["category"] = newCategory;

    if (!newCategory) {
      alert("Put in a category");
      return;
    }

    firebase
      .firestore()
      .collection("Categories")
      .doc(newCategory)
      .collection("All")
      .doc(item.uid)
      .set(item)
      .then(() => {
        firebase
          .firestore()
          .collection("Categories")
          .doc(oldCategory)
          .collection("All")
          .doc(item.uid)
          .delete()
          .then(() => {
            this.setState({
              activeModal: null,
            });
          })
          .catch((e) => {
            alert(e.message);
          });
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  changeSeller() {
    const item = this.state.activeModal;
    const seller = document.getElementById("seller-change").value;
    if (!seller) {
      return;
    }
    firebase
      .firestore()
      .collection("Categories")
      .doc(item.category)
      .collection("All")
      .doc(item.uid)
      .update({
        seller: seller,
      })
      .then(() => {
        this.setState({
          activeModal: null,
        });
      });
  }

  changeTitle() {
    const item = this.state.activeModal;
    const title = document.getElementById("title-change").value;

    firebase
      .firestore()
      .collection("Categories")
      .doc(item.category)
      .collection("All")
      .doc(item.uid)
      .update({
        title: title,
      })
      .then(() => {
        this.setState({
          activeModal: null,
        });
      });
  }

  changePrice() {
    const item = this.state.activeModal;
    const price = parseInt(document.getElementById("price-change").value);
    if (!price) {
      return;
    }
    firebase
      .firestore()
      .collection("Categories")
      .doc(item.category)
      .collection("All")
      .doc(item.uid)
      .update({
        original_price: price,
      })
      .then(() => {
        this.setState({
          activeModal: null,
        });
      });
  }

  changeDescription() {
    const item = this.state.activeModal;
    const description = document.getElementById("description-change").value;
    if (!description) {
      return;
    }
    firebase
      .firestore()
      .collection("Categories")
      .doc(item.category)
      .collection("All")
      .doc(item.uid)
      .update({
        description: description,
      })
      .then(() => {
        this.setState({
          activeModal: null,
        });
      });
  }

  deleteItem() {
    const item = this.state.activeModal;
    firebase
      .firestore()
      .collection("Categories")
      .doc(item.category)
      .collection("All")
      .doc(item.uid)
      .delete()
      .then(() => {
        this.setState({
          activeModal: null,
        });
      });
  }
}
