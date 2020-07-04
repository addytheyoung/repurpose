import React from "react";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";

export default class WhatHaveISoldPage extends React.Component {
  constructor(props) {
    super(props);

    const mySellerId = firebase.auth().currentUser.uid;
    console.log(firebase.auth().currentUser.uid);
    const allItemSold = [];
    // Go through all the orders, find the orders that contain my seller id

    firebase
      .firestore()
      .collection("Orders")
      .where("seller_array", "array-contains", mySellerId)
      .get()
      .then((mySales) => {
        // Go through each order
        mySales.docs.forEach((doc) => {
          const itemsSold = doc.data().items;
          // Find the item that was mine
          itemsSold.forEach((item) => {
            if (item.seller == mySellerId) {
              // Found the item.
              allItemSold.push(item);
            }
          });
        });

        this.setState({
          allItemSold: allItemSold,
          loaded: true,
        });
      });

    this.state = {
      allItemSold: null,
      loaded: false,
    };
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    const allItemSold = this.state.allItemSold;
    var totalPay = 0;
    allItemSold.forEach((item) => {
      totalPay += parseInt(item.original_price * 0.4 * 100) / 100;
    });
    return (
      <div>
        <div>
          <HeaderBar />
        </div>
        <div
          style={{
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <div
            style={{
              marginTop: 20,
              fontSize: 24,
              fontWeight: 400,
            }}
          >
            {allItemSold.length + " items sold"}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            {"Total Pay: $" + totalPay}
          </div>

          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {this.state.allItemSold.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    marginTop: 10,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  <div style={{ fontWeight: 500 }}>
                    {"Item " + parseInt(index + 1)}
                  </div>

                  <div style={{}}>
                    <div style={{}}>
                      <img
                        style={{
                          width: 300,
                          height: 300,
                          borderRadius: 3,
                        }}
                        src={item.pictures[0]}
                      ></img>

                      <div style={{ fontWeight: 600 }}>
                        {"Your Pay: $" +
                          parseInt(item.original_price * 0.4 * 100) / 100}
                      </div>
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
}
