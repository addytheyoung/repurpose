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
        console.log(catDocs.length);
        var i_index = 0;
        for (var i = 0; i < catDocs.length; i++) {
          const item = catDocs[i].data();
          if (true) {
            i_index++;
            firebase
              .firestore()
              .collection("Categories")
              .doc(category)
              .collection("All")
              .doc(catDocs[i].id)
              .update({
                original_price: item.original_price + 1,
              });
            if (i_index == catDocs.length) {
              alert("Done");
            }
          }
        }
      });
    return <div>S</div>;
  }
}
