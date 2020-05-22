import React from "react";

import * as firebase from "firebase";

export default class ChangePrices extends React.Component {
  render() {
    alert("Starting");
    const category = "Art & Decoration";
    firebase
      .firestore()
      .collection("Categories")
      .doc(category)
      .collection("All")
      .get()
      .then((cat) => {
        const catDocs = cat.docs;
        for (var i = 0; i < catDocs.length; i++) {
          const item = catDocs[i].data();
          if (item.original_price != 1) {
            firebase
              .firestore()
              .collection("Categories")
              .doc(category)
              .collection("All")
              .doc(catDocs[i].id)
              .update({
                original_price: item.original_price - 1,
              });
          }
        }
      });
    return <div>S</div>;
  }
}
