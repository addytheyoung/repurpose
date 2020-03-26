import React from "react";
import "./css/Buy.css";
import HeaderBar from "./HeaderBar";
import Art from "./images/art.jpeg";
import Books from "./images/book.jpg";
// import Fashion from "./images/fashion.jpg";

export default class Buy extends React.Component {
  render() {
    const categories = [
      { picture: Art, name: "Art & Home Decoration", link: "art" },
      { picture: Books, name: "Collectibles", link: "collectibles" },
      { picture: Books, name: "Books", link: "books" },
      { picture: Books, name: "Electronics", link: "electronics" },
      { picture: Books, name: "Health & Beauty", link: "health" },
      { picture: Books, name: "Home & Garden", link: "home" },
      { picture: Books, name: "Fashion", link: "fashion" },
      { picture: Books, name: "Sporting Goods", link: "sports" },
      { picture: Books, name: "Toys", link: "toys" }
    ];
    return (
      <div>
        <div>
          <HeaderBar />
        </div>
        <div
          style={{
            marginLeft: "15vw",
            marginRight: "15vw",
            marginTop: 30
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 24, fontWeight: 600 }}>
              Shop by Category
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "70vw",
                justifyContent: "center"
              }}
            >
              {categories.map((cat, index) => {
                return (
                  <div
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
                      marginRight: 10
                    }}
                  >
                    <img
                      src={cat.picture}
                      style={{
                        width: 220,
                        height: 200,
                        borderRadius: 5,
                        overflow: "hidden"
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
    );
  }

  goToCategory(cat) {
    //  window.open("https://collection.deals/shop/" + cat.link, "_self");
    window.open("http://localhost:3000/shop/" + cat.link, "_self");
  }
}
