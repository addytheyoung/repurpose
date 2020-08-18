import React from "react";
import "../css/Buy.css";
import "../css/BuyMobile.css";
import ClipLoader from "react-spinners/ClipLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import Close from "../images/close.png";
import HeaderBar from "../HeaderBar";
import * as firebase from "firebase";
import randomizeArray from "../global_methods/randomizeArray";
import FilterBar from "../FilterBar";
import Back from "../images/back.png";
import Front from "../images/arrow.png";
import HeaderMobile from "./HeaderMobile";
import FooterMobile from "./FooterMobile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchPageMobile from "./SearchPageMobile";
import Div100vh from "react-div-100vh";
import AboutPageMobile from "./AboutPageMobile";
import ProfilePageMobile from "./ProfilePageMobile";

export default class BuyMobile extends React.Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

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
      finishedPullingItems: false,
      newItems: [],
      foundNewItems: false,
      activeSales: [true, true, true, true, true, true, true, true, true],
      homePage: true,
      aboutPage: false,
      searchPage: false,
      profilePage: false,
      modalPictureIndex: 0,
    };
    this.state.finishedPullingItems = false;
    this.pullItemsFromDatabase(this.state.activeCategories, null, true);
    this.pullNewItemsFromDatabase();
  }
  render() {
    console.log(!this.state.finishedLoading);
    if (!this.state.loaded || !this.state.foundNewItems) {
      return (
        <div
          style={{
            height: "100vh",
          }}
        >
          <div
            style={{
              position: "fixed",
              left: window.innerWidth / 2 - 40,
              top: "30vh",
            }}
          >
            <ClipLoader size={80} color={"#123abc"} loading={true} />
          </div>
        </div>
      );
    }
    const q = window.location.search;
    const urlParams = new URLSearchParams(q);
    var itemCategory = urlParams.get("itemcategory");
    if (itemCategory && itemCategory.trim() == "Art") {
      itemCategory = "Art & Decoration";
    } else if (itemCategory && itemCategory.trim() == "Clothing, Shoes,") {
      itemCategory = "Clothing, Shoes, & Accessories";
    } else if (itemCategory && itemCategory.trim() == "Sports") {
      itemCategory = "Sports & Hobbies";
    } else if (itemCategory && itemCategory.trim() == "Toys") {
      itemCategory = "Toys & Games";
    }
    const city = urlParams.get("city");
    var item = urlParams.get("item");
    if (item && !this.state.modal) {
      // We need to pull the item from the database.
      firebase
        .firestore()
        .collection("Categories")
        .doc(itemCategory)
        .collection("All")
        .doc(item)
        .get()
        .then((itemData) => {
          if (!itemData || !itemData.data()) {
            item = null;
          } else {
            this.setState({
              modal: itemData.data(),
            });
          }
        });
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
    if (city) {
      localStorage.setItem("city", city);
    }

    // Set the modal variables
    var itemDiscount = -1;
    var itemCurrentPrice = -1;
    var showDecimalsOriginal = true;
    var showDecimalsCurrent = true;
    if (item) {
      itemDiscount = 1 - this.state.modal.current_price;
      itemCurrentPrice =
        this.state.modal.original_price -
        this.state.modal.original_price * itemDiscount;
      // See if we need decimals for the original price
      if (this.state.modal.original_price % 1 == 0) {
        showDecimalsOriginal = false;
      }
      // See if ywe need decimals for the current price
      if (itemCurrentPrice % 1 == 0) {
        showDecimalsCurrent = false;
      }
    }

    return (
      <div style={{ overflowX: "hidden", width: "100vw" }}>
        {!this.state.aboutPage && (
          <div style={{ position: "fixed", top: 0, zIndex: 100 }}>
            <HeaderMobile
              updateSalesFilter={(sales) => this.updateSalesFilter(sales)}
              updateCategoryFilter={(a, b) => this.updateCategoryFilter(a, b)}
              setPriceFilter={(a, b) => this.updateFilter(a, b)}
            />
          </div>
        )}
        <div style={{ position: "fixed", bottom: 0, zIndex: 102 }}>
          <FooterMobile
            closePage={(page) => this.closePage(page)}
            openPage={(page) => this.openPage(page)}
            updateFilter={(a, b) => this.updateFilter(a, b)}
          />
        </div>
        {this.state.aboutPage && (
          <div style={{ top: 0, height: "90vh", zIndex: 100 }}>
            <AboutPageMobile closePage={() => this.closePage()} />
          </div>
        )}
        {this.state.searchPage && (
          <div style={{ height: "90vh", zIndex: 100 }}>
            <SearchPageMobile closePage={() => this.closePage()} />
          </div>
        )}
        {this.state.profilePage && (
          <ProfilePageMobile
            redirectToCheckout={this.state.redirectToCheckout}
            closePage={() => this.closePage()}
          />
        )}
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
        <div
          style={{
            display: !this.state.loaded ? "none" : "block",
            overflowX: "hidden",
          }}
        >
          {item && (
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
                        width: "4vh",
                        height: "4vh",
                        top: "3vh",
                        right: "3vh",
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
                          src={
                            this.state.modal.pictures[
                              this.state.modalPictureIndex
                            ]
                          }
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
                      >
                        {this.state.modal.pictures.map((pic, index) => {
                          if (this.state.modal.pictures.length == 1) {
                            return;
                          }
                          return (
                            <div
                              id="picture-map"
                              key={index}
                              onClick={() => this.changeModalImg(index)}
                            >
                              <img
                                src={pic}
                                style={{
                                  width: 80,
                                  height: 80 * 0.9,
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
                              {!showDecimalsOriginal &&
                                "$" +
                                  (
                                    Math.round(
                                      this.state.modal.original_price * 100
                                    ) / 100
                                  ).toFixed(0)}
                              {showDecimalsOriginal &&
                                "$" +
                                  (
                                    Math.round(
                                      this.state.modal.original_price * 100
                                    ) / 100
                                  ).toFixed(2)}
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
                          {!showDecimalsCurrent &&
                            "$" +
                              (
                                Math.round(itemCurrentPrice * 100) / 100
                              ).toFixed(0)}
                          {showDecimalsCurrent &&
                            "$" +
                              (
                                Math.round(itemCurrentPrice * 100) / 100
                              ).toFixed(2)}
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
            id="buy-mobile-main"
            style={{
              marginTop: "8vh",
              zIndex: 99,
              overflowX: "hidden",
              width: "100vw",
              overflowY: this.state.homePage ? "scroll" : "hidden",
              height: this.state.homePage && !this.state.modal ? "88vh" : 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    marginTop: "2vh",
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: 15,
                    width: "80vw",
                  }}
                >
                  Items near you, delivered to your doorstep every morning.
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
                        style={{
                          fontSize: 24,
                          fontWeight: 600,
                          marginTop: 10,
                        }}
                      >
                        Items just added
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
                          id="prev-item-mobile"
                          onClick={() =>
                            this.scrollLeft(
                              document.getElementById("scroll"),
                              -300,
                              100
                            )
                          }
                        >
                          Prev
                        </div>
                        <div
                          id="next-item-mobile"
                          onClick={() =>
                            this.scrollLeft(
                              document.getElementById("scroll"),
                              300,
                              100
                            )
                          }
                        >
                          Next
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
                          {this.state.newItems.map((item, index) => {
                            const discount = 1 - item.current_price;
                            const currentPrice =
                              item.original_price -
                              item.original_price * discount;
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
                                        {!showDecimals &&
                                          "$" +
                                            (
                                              Math.round(currentPrice * 100) /
                                              100
                                            ).toFixed(0)}
                                        {showDecimals &&
                                          "$" +
                                            (
                                              Math.round(currentPrice * 100) /
                                              100
                                            ).toFixed(2)}
                                      </div>
                                      <div
                                        style={{
                                          fontWeight: 400,
                                          fontSize: 16,
                                          marginLeft: 10,
                                          color: "#cc0000",
                                          opacity:
                                            discount == 0
                                              ? 0
                                              : discount * 15 * 0.25,
                                        }}
                                      >
                                        {Math.round(discount * 100).toFixed(0) +
                                          "%"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
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
                    scrollableTarget={"buy-mobile-main"}
                    children={this.state.items}
                    dataLength={this.state.items.length} //This is important field to render the next data
                    next={() => this.next()}
                    hasMore={!this.state.finishedLoading}
                    scrollThreshold={0.7}
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
                        width: "100vw",
                        overflowX: "hidden",
                        minHeight: "80vh",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      {this.state.items.map((item, index) => {
                        if (!item) {
                          return null;
                        }
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
                                marginTop: "4vh",
                                marginBottom: "2vh",
                                width: "70vw",
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 24,
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
                        var showDecimals = true;
                        if (currentPrice % 1 == 0) {
                          // It's a while number. Don't show decimals.
                          showDecimals = false;
                        }
                        const f = Math.round(discount * 100).toFixed(0);

                        // Check the discount filter
                        const activeSales = this.state.activeSales;

                        if (f == 0 && !activeSales[0]) {
                          return null;
                        } else if (f == 10 && !activeSales[1]) {
                          return null;
                        } else if (f == 20 && !activeSales[2]) {
                          return null;
                        } else if (f == 30 && !activeSales[2]) {
                          return null;
                        }

                        return (
                          <div
                            key={index}
                            style={{
                              width: "49vw",
                              marginLeft: "0.3vw",
                              marginRight: "0.3vw",
                              marginBottom: "1vh",
                            }}
                          >
                            <div
                              onClick={() => this.itemPage(item)}
                              id="box"
                              style={{
                                width: "49vw",
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
                                  minHeight: 50,
                                  display: "block",
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
                                        (
                                          Math.round(currentPrice * 100) / 100
                                        ).toFixed(0)}
                                    {showDecimals &&
                                      "$" +
                                        (
                                          Math.round(currentPrice * 100) / 100
                                        ).toFixed(2)}
                                  </div>
                                  <div
                                    style={{
                                      fontWeight: 400,
                                      fontSize: 16,
                                      marginLeft: 10,
                                      color: "#cc0000",
                                      opacity:
                                        discount == 0
                                          ? 0
                                          : discount * 15 * 0.25,
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
                  height: "15vh",
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

  changeModalImg(pictureIndex) {
    this.setState({
      modalPictureIndex: pictureIndex,
    });
  }

  closePage(page) {
    if (page == "homePage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
      });
    } else if (page == "aboutPage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
      });
    } else if (page == "searchPage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
      });
    } else if (page == "profilePage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
      });
    }
  }

  openPage(page) {
    if (page == "homePage") {
      this.setState({
        homePage: true,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
      });
    } else if (page == "aboutPage") {
      this.setState({
        homePage: false,
        aboutPage: true,
        searchPage: false,
        profilePage: false,
      });
    } else if (page == "searchPage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: true,
        profilePage: false,
      });
    } else if (page == "profilePage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: true,
      });
    }
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
    // Add modal id as a string to the URL
    window.history.replaceState(
      null,
      null,
      "/?item=" + item.uid + "&itemcategory=" + item.category
    );
    this.setState({
      modal: item,
    });
  }

  closeModal(e) {
    window.history.replaceState(null, null, "/");
    this.setState({
      modal: null,
      modalPictureIndex: 0,
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
          window.history.replaceState(null, null, "/");
          this.setState({
            modal: null,
            modalPictureIndex: 0,
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
                        window.history.replaceState(null, null, "/");

                        this.setState({
                          modal: null,
                          modalPictureIndex: 0,

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
                        window.history.replaceState(null, null, "/");

                        this.setState({
                          modal: null,
                          modalPictureIndex: 0,
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
                window.history.replaceState(null, null, "/");

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
                window.history.replaceState(null, null, "/");

                this.setState({
                  modal: null,
                  modalPictureIndex: 0,
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
                modalPictureIndex: 0,
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
                modalPictureIndex: 0,
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
        .where("current_price", "==", 1)
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

  updateSalesFilter(sales) {
    this.setState({
      activeSales: sales,
    });
  }

  updateCategoryFilter(categories) {
    this.setState({
      activeCategories: categories,
      currentCategoryIndex: 0,
      finishedLoading: false,
      items: [],
      modal: null,
      modalPictureIndex: 0,
      finalDoc: 0,
    });

    this.pullItemsFromDatabase(categories, true);
  }

  updateFilter(min, max) {
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
    this.setState({
      width: window.innerWidth - window.innerWidth * (15 / 100),
      height: window.innerHeight,
    });
  }
}
