import React from "react";
import "./css/Buy.css";
import ClipLoader from "react-spinners/ClipLoader";
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
// import Fashion from "./images/fashion.jpg";

export default class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  render() {
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
          <div>
            <HeaderBar />
          </div>
          <div
            style={{
              marginLeft: "15vw",
              marginRight: "15vw",
              marginTop: 30,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {firebase.auth().currentUser &&
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
                )}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ fontSize: 24, fontWeight: 600, height: 30 }}>
                  Shop by Category
                </div>
                <div
                  id="all-items"
                  onClick={() =>
                    (window.location.href =
                      "/search/?" +
                      "search=" +
                      "" +
                      "&category=" +
                      "All Categories" +
                      "&city=" +
                      localStorage.getItem("city"))
                  }
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: 400,
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  {"See all items in " + localStorage.getItem("city")}
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
              >
                {categories.map((cat, index) => {
                  return (
                    <div
                      key={index}
                      id={"cat"}
                      onClick={() => this.goToCategory(cat)}
                      style={{
                        width: 220,
                        marginTop: 30,
                        height: 250,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      <img
                        onLoadCapture={() => this.loadPage(index)}
                        src={cat.picture}
                        style={{
                          width: 220,
                          height: 200,
                          borderRadius: 5,
                          overflow: "hidden",
                        }}
                      ></img>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ marginTop: 10 }}>{cat.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
