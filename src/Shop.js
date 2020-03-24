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
    category = category[0].toUpperCase() + category.slice(1);

    this.state = {
      loaded: false,
      items: [],
      category: category,
      minPrice: null,
      maxPrice: null,
      modal: null
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
              modal: itemArr[0]
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
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{this.state.modal.title}</div>
                    <div>{"$" + this.state.modal.original_price}</div>
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
                    <div style={{ fontSize: 18, fontWeight: 500 }}>
                      {item.title}
                    </div>
                    <div style={{ marginTop: 5 }}>
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
}
