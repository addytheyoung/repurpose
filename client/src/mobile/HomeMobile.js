import React from "react";
import PlacesAutocomplete from "../PlacesAutocomplete";
import "../css/HomeMobile.css";
import * as firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import Close from "../images/close.png";
import randomizeArray from "../global_methods/randomizeArray";
import SignInOnlyModal from "../SignInOnlyModal";
import Money from "../images/money.svg";
import Shop from "../images/shop.svg";
import Delivery from "../images/delivery.svg";
import Div100vh from "react-div-100vh";

export default class HomeMobile extends React.Component {
  citiesList = ["Austin, TX"];
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {
      loaded: false,
      items: [],
      modal: null,
      addingToCart: false,
      addressModal: false,
      width: 0,
      height: 0,
    };

    // If we're signed in, sign us out.
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          window.location.reload();
        });
    }
    const categoryList = [
      "Art & Decoration",
      "Home",
      "Books",
      "Electronics",
      "Toys & Games",
      "Garden",
      "Sports & Hobbies",
    ];

    const firebaseCats = firebase.firestore().collection("Categories");
    var i_index = 0;
    var itemArr = [];
    for (var i = 0; i < categoryList.length; i++) {
      firebaseCats
        .doc(categoryList[i])
        .collection("All")
        .where("location", "==", "Austin, TX")
        .limit(5)
        .get()
        .then((allItems) => {
          i_index++;
          var allItemsDocs = allItems.docs;
          randomizeArray(allItemsDocs);

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

    var itemDiscount = -1;
    var itemCurrentPrice = -1;
    if (this.state.modal) {
      itemDiscount = 1 - this.state.modal.current_price;
      itemCurrentPrice =
        this.state.modal.original_price -
        this.state.modal.original_price * itemDiscount;
    }

    return (
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "100vh",
        }}
      >
        {this.state.profile && (
          <SignInOnlyModal
            redirectUrl={"/"}
            closeModal={(e) => this.closeModal(e)}
          />
        )}
        {this.state.addressModal && (
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
                // width: "60vw",
                borderRadius: 5,
                // height: "80vh",
                top: 0,
                backgroundColor: "#ffffff",
                position: "fixed",
                zIndex: 100,
                opacity: 1,
                width: "100vw",
                height: "100vh",
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
                      top: 30,
                      right: 30,
                      position: "fixed",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "12vh",
                    marginBottom: "5vh",
                    fontSize: 20,
                  }}
                >
                  Enter your city or zip to make sure we can deliver to you!
                </div>
                <PlacesAutocomplete
                  mobile={true}
                  activeButton={false}
                  modal={this.state.tempModal}
                />
              </div>
            </div>
          </div>
        )}
        {this.state.modal && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              zIndex: 200,
              // alignItems: "center"
            }}
          >
            <Div100vh
              style={{
                width: "100vw",
                borderRadius: 5,
                position: "fixed",
                overflowY: "scroll",
                height: "100vh",
                top: 0,
                backgroundColor: "#f5f5f5",
                // position: "absolute",
                zIndex: 200,
                opacity: 1,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      marginTop: 20,
                      textAlign: "center",
                      padding: 10,
                      width: "65vw",
                      minHeight: 20,
                    }}
                  >
                    {this.state.modal.title}
                  </div>
                  <img
                    id="close"
                    onClick={() => this.closeModal()}
                    src={Close}
                    style={{
                      width: "10vw",
                      height: "10vw",
                      top: 30,
                      right: 30,
                      position: "fixed",
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
                          width: "80vw",
                          height: "72vw",
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
                      alignItems: "center",
                    }}
                  >
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
                            fontSize: 24,
                            fontWeight: 500,
                            marginTop: 10,
                            textAlign: "center",
                            padding: 10,
                          }}
                        >
                          {this.state.modal.title}
                        </div> */}

                      {Math.round(itemDiscount * 100).toFixed(0) != 0 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              marginTop: 10,
                              fontWeight: 500,
                              fontSize: 22,
                              textAlign: "center",
                              textDecoration: "line-through",
                            }}
                          >
                            {"$" +
                              (
                                Math.round(
                                  this.state.modal.original_price * 10
                                ) / 10
                              ).toFixed(1)}
                          </div>
                          <div
                            style={{
                              fontWeight: 400,
                              fontSize: 16,
                              marginLeft: 10,
                              color: "#cc0000",
                              textAlign: "center",
                              marginTop: 10,
                            }}
                          >
                            {Math.round(itemDiscount * 100).toFixed(0) +
                              "% off"}
                          </div>
                        </div>
                      )}

                      <div
                        style={{
                          marginTop: 30,
                          fontWeight: 700,
                          fontSize: 24,
                          textAlign: "center",
                        }}
                      >
                        {"$" +
                          (Math.round(itemCurrentPrice * 10) / 10).toFixed(1)}
                      </div>

                      <div
                        onClick={() => this.addToCart(this.state.modal)}
                        id="add-to-cart"
                        style={{
                          backgroundColor: "#426CB4",
                          marginTop: 20,
                          borderRadius: 5,
                          padding: 10,
                          width: 300,

                          height: "7vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: 22,
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
                    fontSize: 14,
                    marginTop: 20,
                    fontWeight: 600,
                  }}
                >
                  Item Details
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 14,
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
                  <div style={{ height: "20vh" }}></div>
                </div>
              </div>
            </Div100vh>
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
          <div
            id="bar"
            style={{ display: "flex", flexDirection: "row", width: 180 }}
          >
            <div
              style={{
                fontWeight: 800,
                height: 80,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 28,
                color: "#426CB4",
                marginLeft: 50,
              }}
            >
              Collect
            </div>
            <div
              style={{
                fontWeight: 800,
                height: 80,
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
          <div style={{ width: "100%" }}></div>
          {firebase.auth().currentUser && (
            <div
              id="become-collector"
              onClick={() =>
                this.setState({
                  profile: true,
                })
              }
              style={{
                minWidth: 100,
                fontWeight: 500,
                height: 80,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Sign in
            </div>
          )}
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
            About
          </div>
        </div>
        <div
          style={{
            height: "30vh",
            width: "100vw",
            backgroundColor: "#ffffff",
            paddingTop: 10,
            paddingBottom: 20,
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="buy-sell-title"
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 0.1,
              marginTop: "1vh",
              textAlign: "center",
            }}
          >
            Cheap items, at your doorstep
          </div>
          <div
            style={{
              marginTop: "2vh",
              fontSize: 16,
              textAlign: "center",
              paddingLeft: "5vw",
              paddingRight: "5vw",
            }}
          >
            As many items as you want, delivered to you the next morning for a
            flat $2 order fee.
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlacesAutocomplete
              activeButton={true}
              modal={null}
              mobile={true}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "1vh",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", width: "100vw", marginTop: "5vh" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 26,
                  fontWeight: 500,
                  textAlign: "center",
                  marginLeft: "20vw",
                  width: "60vw",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Items Near Austin
              </div>
              <div
                style={{
                  opacity: 0.6,
                  fontSize: 17,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                (1,000+)
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
              <div
                id="prev-item"
                onClick={() =>
                  this.scrollLeft(document.getElementById("scroll"), -300, 100)
                }
              >
                Prev
              </div>
              <div
                id="mobile-next-item"
                onClick={() =>
                  this.scrollLeft(document.getElementById("scroll"), 300, 100)
                }
              >
                Next
              </div>
            </div>
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
              {this.state.items.map((item, index) => {
                const discount = 1 - item.current_price;
                const currentPrice =
                  item.original_price - item.original_price * discount;
                return (
                  <div
                    key={index}
                    onClick={() => this.itemPage(item)}
                    id="box"
                    style={{
                      width: "49vw",
                      marginLeft: "0.3vw",
                      marginRight: "0.3vw",
                      marginBottom: "1vh",
                    }}
                  >
                    <img
                      src={item.pictures[0]}
                      style={{
                        width: "49vw",
                        height: "44.5vw",
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    ></img>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "1vw",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 400,
                          maxWidth: "48vw",
                        }}
                      >
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
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 20,
                          }}
                        >
                          {"$" +
                            (Math.round(currentPrice * 10) / 10).toFixed(1)}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            marginTop: "3vh",
          }}
        >
          <div className="mobile-home1">
            <img src={Money} style={{ width: 60, height: 60 }}></img>
            <div className="mobile-home2">Price Drops</div>
            <div className="mobile-home3">
              We drop the prices of items every week, up to 80%. We're stupid
              cheap.
            </div>
          </div>

          <div className="mobile-home1">
            <img src={Shop} style={{ width: 60, height: 60 }}></img>

            <div className="mobile-home2">New Items</div>
            <div className="mobile-home3">
              We add new items daily. Check back often to find them.
            </div>
          </div>
          <div className="mobile-home1">
            <img src={Delivery} style={{ width: 60, height: 60 }}></img>

            <div className="mobile-home2">Lightning Delivery</div>
            <div className="mobile-home3">
              Your entire order, delivered to your doorstep the next morning for
              a $2 order fee.
            </div>
          </div>
        </div>
        <div style={{ height: "10vh" }}></div>
      </div>
    );
  }

  closeModal() {
    this.setState({
      profile: false,
      modal: false,
      logout: false,
      email: false,
      newUser: false,
      retUser: false,
      addressModal: false,
      tempModal: null,
    });
  }

  addToCart(modal) {
    // We have to make sure they are close enough for delivery first. Make them put in their address with a modal.
    this.setState({
      addressModal: true,
      modal: false,
      tempModal: modal,
    });
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

  search() {}

  itemPage(item) {
    this.setState({
      modal: item,
    });
  }

  startShopping() {
    var email = document.getElementById("email").value;
    if (email) {
      email = email.toLowerCase();
    }

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

    const t = this;
    const st = this.state;
    var animateScroll = function () {
      currentTime += increment;
      if (change > 0) {
        element.scrollLeft = element.scrollLeft + window.innerWidth / 5;
      } else {
        element.scrollLeft = element.scrollLeft - window.innerWidth / 5;
      }
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
}
