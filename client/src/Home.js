import React from "react";
import HeaderBar from "./HeaderBar";
import { Input } from "@material-ui/core";
import "./css/Home.css";
import * as firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Shop from "./Shop";
import ClipLoader from "react-spinners/ClipLoader";
import Art from "./images/art.jpeg";
import Close from "./images/close.png";

export default class Home extends React.Component {
  citiesList = ["Athens, TX"];
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      items: [],
      category: "Art",
      minPrice: null,
      maxPrice: null,
      modal: null,
      addingToCart: false
    };

    firebase
      .firestore()
      .collection("Categories")
      .doc("Art")
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#e8e8e8",
            borderBottomStyle: "solid",
            width: "100vw"
          }}
        >
          <div
            style={{
              width: 160,
              fontWeight: 700,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 24,
              color: "#7628dd",
              marginLeft: 100
            }}
          >
            Collection
          </div>
          <div style={{ width: "100%" }}></div>
          <div
            id="become-collector"
            onClick={() => this.becomeCollector()}
            style={{
              minWidth: 100,
              fontWeight: 500,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 16,
              textAlign: "center",
              marginRight: 0
            }}
          >
            Become a Collector
          </div>
          <div
            id="sign-in"
            style={{
              minWidth: 100,
              fontWeight: 500,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 16,
              marginRight: 100
            }}
          >
            Sign in
          </div>
        </div>
        <div
          style={{
            height: "40vh",
            width: "100vw",
            backgroundColor: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            id="buy-sell-title"
            style={{
              fontSize: 26,
              fontWeight: 600
            }}
          >
            Buy or sell anything in seconds
          </div>
          <div style={{ height: 30 }}></div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Autocomplete
              id="combo-box-demo"
              options={this.citiesList}
              getOptionLabel={option => option}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  placeholder="We add more cities every day!"
                  label="City"
                  variant="outlined"
                  fullWidth
                />
              )}
              freeSolo={true}
              style={{ width: "300px" }}
            />

            <div
              onClick={() => this.search()}
              id="start"
              style={{
                marginLeft: 10,
                padding: 10,
                borderRadius: 5,
                backgroundColor: "black",
                fontWeight: 600,
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              Let's go
            </div>
          </div>
          <div style={{ marginTop: 50, display: "flex", flexDirection: "row" }}>
            <div
              style={{
                width: 120,
                fontSize: 12,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              1. We pick up any items people want to sell or get rid of
            </div>
            <div
              style={{
                width: 120,
                fontSize: 12,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              2. We price the items, pay the seller, and list them here
            </div>
            <div
              style={{
                width: 120,
                fontSize: 12,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              3. Items sell to local buyers for cheap
            </div>

            <div
              style={{
                width: 120,
                fontSize: 12,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              4. Items are picked up or delivered within a few hours
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            marginLeft: 50,
            marginTop: 20
          }}
        >
          Items near Athens, Texas
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
            marginLeft: 50,
            marginRight: 50
          }}
        >
          {this.state.items.map((item, index) => {
            if (
              (this.state.minPrice &&
                item.original_price < this.state.minPrice) ||
              (this.state.maxPrice && item.original_price > this.state.maxPrice)
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
    );
  }

  becomeCollector() {
    window.location.href = "/become_collector";
  }

  search() {
    const city = document.getElementById("combo-box-demo").value.trim();
    if (city === "" || !this.citiesList.includes(city)) {
      alert("Invalid city");
      return;
    }
    window.localStorage.setItem("city", city);
    window.location.href = "/";
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
