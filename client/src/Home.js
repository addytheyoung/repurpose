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
import randomizeArray from "./global_methods/randomizeArray";

export default class Home extends React.Component {
  citiesList = ["Austin, TX"];
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      items: [],
      category: "Art",
      minPrice: null,
      maxPrice: null,
      modal: null,
      addingToCart: false,
    };
    const categoryList = [
      "Art & Decoration",
      "Toys & Hobbies",
      "Books",
      "Clothing, Shoes, & Accessories",
      "Electronics",
      "Home & Garden",
      "Movies & Video Games",
      "Home & Garden",
      "Sporting Goods",
      "Everything Else",
    ];

    const firebaseCats = firebase.firestore().collection("Categories");
    var i_index = 0;
    var itemArr = [];
    for (var i = 0; i < categoryList.length; i++) {
      firebaseCats
        .doc(categoryList[i])
        .collection("All")
        .where("location", "==", "Austin, TX")
        .limit(20)
        .get()
        .then((allItems) => {
          i_index++;
          const allItemsDocs = allItems.docs;

          if (allItems.empty) {
            this.setState({
              items: itemArr,
              loaded: true,
              modal: null,
            });
          }
          for (var j = 0; j < allItemsDocs.length; j++) {
            const itemData = allItemsDocs[j].data();
            // See if the search matches
            itemArr.push(itemData);
            // Find a way to render all the items here

            if (
              j === allItemsDocs.length - 1 &&
              i_index === categoryList.length - 1
            ) {
              // itemArr = randomizeArray(itemArr);
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
        {this.state.profile && (
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
                width: "30vw",
                borderRadius: 5,
                height: "40vh",
                top: 30,
                backgroundColor: "#f5f5f5",
                position: "fixed",
                zIndex: 100,
                opacity: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: 600 }}>Log in</div>
                  <Input
                    id="email"
                    placeholder="Email"
                    style={{ width: 300, marginTop: 20 }}
                  />
                  <Input
                    id="pass"
                    type="password"
                    placeholder="Password"
                    style={{ width: 300, marginTop: 30 }}
                  />
                  <div
                    onClick={() => this.startShopping()}
                    id="start-shopping"
                    style={{
                      backgroundColor: "#426CB4",
                      borderRadius: 5,
                      padding: 10,
                      height: 30,
                      width: 300,
                      color: "white",
                      fontWeight: 600,
                      marginTop: 10,
                      marginBottom: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    START SHOPPING
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
                height: "80vh",
                top: 30,
                backgroundColor: "#f5f5f5",
                position: "fixed",
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

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ marginLeft: 20 }}>
                      <img
                        src={this.state.modal.pictures[0]}
                        style={{ width: 400, height: 400 }}
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
                        return (
                          <div>
                            <img
                              src={pic}
                              style={{
                                width: 80,
                                height: 80,
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
                            marginLeft: 20,
                            padding: 10,
                            width: 150,
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#e8e8e8",
            borderBottomStyle: "solid",
            width: "100vw",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", width: 180 }}>
            <div
              style={{
                fontWeight: 600,
                height: 80,
                fontFamily: "Pridi",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 28,
                color: "426CB4",
                marginLeft: 50,
              }}
            >
              Tates
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
                color: "#c06826",
              }}
            >
              crate
            </div>
          </div>
          <div style={{ width: "100%" }}></div>
          <div
            id="become-collector"
            onClick={() => (window.location.href = "/help/?header=fdc")}
            style={{
              minWidth: 100,
              fontWeight: 500,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 16,
              textAlign: "center",
              marginRight: 20,
            }}
          >
            Help
          </div>
          {/* <div
            id="become-collector"
            onClick={() => (window.location.href = "/become_collector")}
            style={{
              minWidth: 100,
              fontWeight: 500,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 16,
              textAlign: "center",
              marginRight: 100,
            }}
          >
            Become a Collector
          </div> */}
        </div>
        <div
          style={{
            height: "40vh",
            width: "100vw",
            backgroundColor: "#fafafa",
            paddingTop: 20,
            paddingBottom: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="buy-sell-title"
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 0.1,
            }}
          >
            Buy or sell anything, easily
          </div>
          <div style={{ height: 30 }}></div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Autocomplete
              id="combo-box-demo"
              options={this.citiesList}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderOption={(option) => (
                <div
                  onClick={() => this.updateCity(option)}
                  style={{ width: "100%", height: "1005" }}
                >
                  {option}
                </div>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="We add more cities every day!"
                  label="What city are you in?"
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
                width: 140,
                padding: 5,
                borderRadius: 6,
                backgroundColor: "#426CB4",
                fontWeight: 700,
                fontSize: 20,
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              GET STARTED
            </div>
          </div>
          <div
            style={{
              marginTop: 50,
              marginBottom: 20,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginRight: 20,
                fontWeight: 500,
                fontSize: 21,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              SELL
            </div>
            <div
              style={{
                width: 200,
                fontSize: 18,
                marginLeft: 10,
                marginRight: 10,
                textAlign: "center",
              }}
            >
              We pick up and buy all your clutter
            </div>
          </div>
          <div
            style={{
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 50,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            OR
          </div>
          <div style={{ marginTop: 30, display: "flex", flexDirection: "row" }}>
            <div
              style={{
                marginRight: 21,
                fontWeight: 500,
                fontSize: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              BUY
            </div>

            <div
              style={{
                width: 200,
                fontSize: 18,
                marginLeft: 10,
                marginRight: 10,
                textAlign: "center",
              }}
            >
              Items are delivered quickly to your doorstep
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            marginLeft: 50,
            marginTop: 20,
          }}
        >
          (Some) Items in Austin, TX
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
              // width: "90vw",
              // flexWrap: "wrap",
              overflowX: "scroll",
              // justifyContent: "center",
              // alignItems: "center",
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

  addToCart(modal) {
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log(modal);
          const uid = this.randomNumber(20);
          localStorage.setItem("tempUid", uid);
          firebase
            .firestore()
            .collection("Users")
            .doc(uid)
            .set({
              cart: [modal],
              orders: [],
              sales: [],
              temporary: true,
            })
            .then(() => {
              localStorage.setItem("cart", 1);
              localStorage.setItem("city", "Austin, TX");
              window.location.href = "/";
            });
        });
    } else {
      console.log(modal);
      const uid = this.randomNumber(20);
      localStorage.setItem("tempUid", uid);
      firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .set({
          cart: [modal],
          orders: [],
          sales: [],
          temporary: true,
        })
        .then(() => {
          localStorage.setItem("cart", 1);
          localStorage.setItem("city", "Austin, TX");
          window.location.href = "/";
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

  updateCity(city) {
    if (city === "" || !this.citiesList.includes(city)) {
      alert("Invalid city");
      return;
    }
    window.localStorage.setItem("city", city);
    window.location.href = "/";
  }

  showProfileModal() {
    this.setState({
      profile: true,
      logout: false,
    });
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
      modal: item,
    });
  }

  closeModal(e) {
    // e.stopPropagation();
    this.setState({
      modal: null,
    });
  }

  startShopping() {
    const email = document.getElementById("email").value;

    if (!this.checkEmail(email)) {
      return;
    }
    this.login();
  }

  checkEmail(email) {
    if (!email) {
      alert("Bad email");
      return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    alert("Bad email");
    return false;
  }

  login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    console.log(email);
    console.log(pass);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((r) => {
        firebase
          .firestore()
          .collection("Users")
          .where("email", "==", email)
          .get()
          .then((myData) => {
            const data = myData.docs[0].data();
            localStorage.setItem("city", data.city);
            this.state.logout = false;
            this.state.email = false;
            this.state.newUser = false;
            this.state.retUser = false;
            this.state.profile = false;
            window.location.reload();
          });
      })
      .catch((e) => {
        alert(e.message);
      });
  }
}
