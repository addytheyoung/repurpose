import React from "react";
import * as firebase from "firebase";
import HeaderBar from "./HeaderBar";
import ClipLoader from "react-spinners/ClipLoader";
import "./css/Shop.css";
import FilterBar from "./FilterBar";
import Art from "./images/art.jpeg";
import Close from "./images/close.png";

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    var category = window.location.pathname.substring(
      6,
      window.location.pathname.length
    );
    // category = category[0].toUpperCase() + category.slice(1);

    category = "Art";
    this.state = {
      loaded: false,
      items: [],
      category: category,
      minPrice: null,
      maxPrice: null,
      modal: null,
      addingToCart: false
    };

    firebase
      .firestore()
      .collection("Categories")
      .doc(category)
      .collection("All")
      .get()
      .then(items => {
        const docs = items.docs;
        const itemArr = [];
        for (var i = 0; i < docs.length; i++) {
          const data = docs[i].data();
          itemArr.push(data);
          if (i === docs.length - 1) {
            this.setState({
              items: itemArr,
              loaded: true,
              modal: null
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
                          marginTop: 100,
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
                        <div
                          onClick={() => this.addToCart(this.state.modal)}
                          id="add-to-cart"
                          style={{
                            backgroundColor: "#9a487d",
                            marginTop: 30,
                            borderRadius: 5,
                            padding: 10,
                            width: 150,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontWeight: 500
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
            flexDirection: "column"
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
              textAlign: "center"
            }}
          >
            {this.state.category}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 50,
              marginLeft: 100,
              marginRight: 100
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
                    height: 300

                    // borderWidth: 1,
                    // borderStyle: "solid"
                  }}
                >
                  <img
                    src={Art}
                    style={{
                      width: 220,
                      height: 200,
                      borderRadius: 5,
                      overflow: "hidden"
                    }}
                  ></img>
                  <div style={{ display: "flex", flexDirection: "column" }}>
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
        </div>
      </div>
    );
  }

  updateFilter(min, max) {
    min = min.substring(1, min.length);
    max = max.substring(1, max.length);
    this.setState({
      minPrice: min,
      maxPrice: max
    });
  }

  itemPage(item) {
    this.setState({
      modal: item
    });
    // window.open("http://localhost:3000/item/" + uid, "_self");
  }

  closeModal(e) {
    // e.stopPropagation();
    this.setState({
      modal: null
    });
  }

  addToCart(item) {
    console.log(item);
    this.setState({
      addingToCart: true
    });

    firebase
      .firestore()
      .collection("Users")
      .doc("aty268")
      .get()
      .then(me => {
        const myCart = me.data().cart;
        myCart.push(item);
        firebase
          .firestore()
          .collection("Users")
          .doc("aty268")
          .update({
            cart: myCart
          })
          .then(() => {
            this.setState({
              modal: null
            });
          });
      });
  }
}
