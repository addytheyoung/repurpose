import React from "react";
import * as firebase from "firebase";
import HeaderBar from "./HeaderBar";
import ClipLoader from "react-spinners/ClipLoader";
import "./css/Shop.css";
import FilterBar from "./FilterBar";

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
      maxPrice: null
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
              loaded: true
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
                  <img style={{ width: 220, height: 200 }}></img>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{item.title}</div>
                    <div>{"$" + item.original_price}</div>
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
}
