import React, { Component } from "react";
import * as firebase from "firebase";

export default class NewItemVariable extends Component {
  constructor(props) {
    super(props);

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

    this.state = {};

    const firebaseCats = firebase.firestore().collection("Categories");
    var i_index = 0;
    for (var i = 0; i < categoryList.length; i++) {
      firebaseCats
        .doc(categoryList[i])
        .collection("All")
        .get()
        .then((collectionData) => {
          i_index++;
          for (var j = 0; j < collectionData.docs.length; j++) {
            const ran = Math.random();
            var finalPrice = 1.0;
            if (ran < 0.55) {
              finalPrice = 0.9;
            } else if (ran >= 0.5 && ran < 0.8) {
              finalPrice = 0.8;
            } else {
              finalPrice = 0.7;
            }
            const item = collectionData.docs[j];
            const category = collectionData.docs[j].data().category;
            const itemId = item.id;
            firebaseCats.doc(category).collection("All").doc(itemId).update({
              current_price: finalPrice,
            });
          }
        });
    }
  }

  render() {
    return <div></div>;
  }
}
