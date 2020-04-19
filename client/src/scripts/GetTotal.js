import React from "react";
import * as firebase from "firebase";

export default class GetTotal extends React.Component {
  constructor(props) {
    alert("here");
    super(props);
    var total = 0;
    firebase
      .firestore()
      .collection("Categories")
      .get()
      .then((a) => {
        for (var i = 0; i < a.docs.length; i++) {
          const doc = a.docs[i];
          firebase
            .firestore()
            .collection("Categories")
            .doc(doc.id)
            .collection("All")
            .get()
            .then((item) => {
              for (var j = 0; j < item.docs.length; j++) {
                const myItem = item.docs[j].data();
                if (myItem && myItem.original_price) {
                  total += myItem.original_price;
                }
                console.log(total);
              }
            });
        }
      });
  }
  render() {
    return <div>s</div>;
  }
}
