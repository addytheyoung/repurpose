import React, { Component } from "react";
import * as firebase from "firebase";

export default class NewItemVariable extends Component {
  constructor(props) {
    super(props);

    // const categoryList = [
    //   "Art & Decoration",
    //   "Books",
    //   "Clothing, Shoes, & Accessories",
    //   "Electronics",
    //   "Home",
    //   "Garden",
    //   "Pet Supplies",
    //   "Sports & Hobbies",
    //   "Toys & Games",
    //   "Everything Else",
    // ];

    this.state = {};

    const firebaseCats = firebase.firestore().collection("Users");
    var i_index = 0;
    firebaseCats.get().then((collectionData) => {
      i_index++;
      for (var j = 0; j < collectionData.docs.length; j++) {
        const item = collectionData.docs[j];
        const itemId = item.id;
        const cart = collectionData.docs[j].data().cart;

        const cartUids = [];
        for (var i = 0; i < cart.length; i++) {
          const itemUid = cart[i].uid;
          cartUids.push(itemUid);
        }

        firebaseCats
          .doc(itemId)
          .update({
            cart_uids: cartUids,
          })
          .then(() => {
            console.log("updated");
          });
      }
    });
  }

  render() {
    return <div></div>;
  }
}
