import React from "react";
import * as firebase from "firebase";

export default class MoveItemCities extends React.Component {
  constructor(props) {
    alert("here");
    super(props);
    var total = 0;
    const newCity = "Austin, TX";
    firebase
      .firestore()
      .collection("Categories")
      .get()
      .then((a) => {
        // Each category
        for (var i = 0; i < a.docs.length; i++) {
          const doc = a.docs[i];
          firebase
            .firestore()
            .collection("Categories")
            .doc(doc.id)
            .collection("All")
            .get()
            .then((item) => {
              // Each item in this category
              for (var j = 0; j < item.docs.length; j++) {
                const myItem = item.docs[j].data();
                firebase
                  .firestore()
                  .collection("Categories")
                  .doc(doc.id)
                  .collection("All")
                  .doc(item.docs[j].id)
                  .update({
                    location: newCity,
                  });
              }
            });
        }
      });
  }
  render() {
    return <div>s</div>;
  }
}
