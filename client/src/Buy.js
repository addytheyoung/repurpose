import React from "react";
import "./css/Buy.css";
import ClipLoader from "react-spinners/ClipLoader";
import InfiniteScroll from "react-infinite-scroll-component";

import Antiques from "./images/antiques.jpg";
import HeaderBar from "./HeaderBar";
import Art from "./images/art.jpeg";
import Electronics from "./images/electronics.jpeg";
import Books from "./images/book.jpg";
import * as firebase from "firebase";
import Toys from "./images/toys.jpeg";
import Sports from "./images/sports.jpg";
import Fashion from "./images/shirt.jpg";
import Movie from "./images/harry.jpg";

import Garden from "./images/garden.jpg";
import Health from "./images/health.webp";
import Home from "./images/home.jpg";
import Pet from "./images/pet.jpg";
import Baby from "./images/baby.jpeg";
import FilterBar from "./FilterBar";
// import Fashion from "./images/fashion.jpg";

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
      finishedLoading: false,
      activeCategories: [true, true, true, true, true, true, true, true, true],
    };

    this.pullItemsFromDatabase(this.state.activeCategories);
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
    const q = window.location.search;
    const urlParams = new URLSearchParams(q);
    const category = urlParams.get("city");
    if (category) {
      localStorage.setItem("city", category);
    }
    const categories = [
      { picture: Art, name: "Art & Decoration", link: "art" },
      { picture: Home, name: "Home", link: "home" },
      // { picture: Baby, name: "Baby", link: "baby" },
      { picture: Books, name: "Books", link: "books" },
      {
        picture: Fashion,
        name: "Clothing, Shoes, & Accessories",
        link: "fashion",
      },
      { picture: Sports, name: "Sports & Hobbies", link: "sports" },
      { picture: Electronics, name: "Electronics", link: "electronics" },
      { picture: Toys, name: "Toys & Games", link: "toys" },

      { picture: Garden, name: "Outside & Garden", link: "garden" },
      { picture: Health, name: "Health & Beauty", link: "health" },

      { picture: Pet, name: "Pet Supplies", link: "pet" },

      // { picture: Garden, name: "Home & Garden", link: "home" },

      // { picture: Movie, name: "Movies & Video Games", link: "movies" },
    ];

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
          <div style={{ position: "fixed", top: 0 }}>
            <HeaderBar updateFilter={(a, b) => this.updateFilter(a, b)} />
          </div>
          <div style={{ position: "fixed", top: 200 }}>
            <FilterBar
              updateCategoryFilter={(a, b) => this.updateCategoryFilter(a, b)}
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
                    fontWeight: 800,
                    marginBottom: 20,
                  }}
                >
                  Items in Austin, TX
                </div>
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
                    next={() =>
                      this.pullItemsFromDatabase(this.state.activeCategories)
                    }
                    hasMore={!this.state.finishedLoading}
                    scrollThreshold={0.9}
                    loader={<h4></h4>}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Check back often for new items</b>
                      </p>
                    }
                    // below props only if you need pull down functionality
                    // refreshFunction={() => alert("refresh")}
                    // pullDownToRefresh
                    // pullDownToRefreshContent={
                    //   <h3 style={{ textAlign: "center" }}>
                    //     &#8595; Pull down to refresh
                    //   </h3>
                    // }
                    // releaseToRefreshContent={
                    //   <h3 style={{ textAlign: "center" }}>
                    //     &#8593; Release to refresh
                    //   </h3>
                    // }
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
                              <div style={{ marginTop: 5, fontWeight: 600 }}>
                                {"$" + item.original_price}
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

  pullItemsFromDatabase(categories, reset) {
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
          currentCategoryIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        this.setState({
          finishedLoading: true,
        });
        return;
      }
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
        if (allItems.empty) {
          if (this.state.currentCategoryIndex == categoryList.length - 1) {
            this.setState({
              finishedLoading: true,
            });
          } else {
            // Go to the next category

            this.setState({
              currentCategoryIndex: currentCategoryIndex + 1,
              items: itemArr,
              loaded: true,
              modal: null,
              finalDoc: 0,
            });
            this.pullItemsFromDatabase(categories);
          }
        } else if (allItemsDocs.length < 20) {
          // Go to the next category

          const finalDoc = allItemsDocs[allItemsDocs.length - 1];
          for (var j = 0; j < allItemsDocs.length; j++) {
            const itemData = allItemsDocs[j].data();
            // See if the search matches
            itemArr.push(itemData);
            // Find a way to render all the items here
            if (j === allItemsDocs.length - 1) {
              // itemArr = randomizeArray(itemArr);
              this.setState({
                items: itemArr,
                loaded: true,
                modal: null,
                finalDoc: 0,
                currentCategoryIndex: currentCategoryIndex + 1,
                currentItemIndex:
                  this.state.currentItemIndex + allItemsDocs.length,
              });
            }
          }

          this.pullItemsFromDatabase(categories);
        } else {
          const finalDoc = allItemsDocs[allItemsDocs.length - 1];
          for (var j = 0; j < allItemsDocs.length; j++) {
            const itemData = allItemsDocs[j].data();
            // See if the search matches
            itemArr.push(itemData);
            // Find a way to render all the items here
            if (j === allItemsDocs.length - 1) {
              // itemArr = randomizeArray(itemArr);
              this.setState({
                items: itemArr,
                loaded: true,
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

  updateCategoryFilter(categories) {
    this.setState({
      activeCategories: categories,
      currentCategoryIndex: 0,
      finishedLoading: false,
      items: [],
      modal: null,
      finalDoc: 0,
    });
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
}
