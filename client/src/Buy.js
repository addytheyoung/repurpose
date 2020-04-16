import React from "react";
import "./css/Buy.css";
import ClipLoader from "react-spinners/ClipLoader";
import Antiques from "./images/antiques.jpg";
import HeaderBar from "./HeaderBar";
import Art from "./images/art.jpeg";
import Electronics from "./images/electronics.jpeg";
import Books from "./images/book.jpg";
import Toys from "./images/toys.jpeg";
import Sports from "./images/sports.jpg";
import Fashion from "./images/shirt.jpg";
import Movie from "./images/harry.jpg";
import Garden from "./images/garden.jpg";
import Health from "./images/health.webp";
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
    const categories = [
      { picture: Antiques, name: "Antiques & Collectibles", link: "antiques" },
      { picture: Art, name: "Art & Home Decoration", link: "art" },
      { picture: Books, name: "Books", link: "books" },
      {
        picture: Fashion,
        name: "Clothing, Shoes, & Accessories",
        link: "fashion",
      },
      { picture: Electronics, name: "Electronics", link: "electronics" },
      { picture: Health, name: "Health & Beauty", link: "health" },
      { picture: Garden, name: "Home & Garden", link: "home" },
      { picture: Sports, name: "Sporting Goods", link: "sports" },
      { picture: Toys, name: "Toys & Games", link: "toys" },

      { picture: Baby, name: "Baby", link: "baby" },
      { picture: Movie, name: "Movies & Video Games", link: "movies" },
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
                      <div style={{ marginTop: 10 }}>{cat.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
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
    if (!this.state.loaded && index == 8) {
      this.setState({
        loaded: true,
      });
    }
  }
}
