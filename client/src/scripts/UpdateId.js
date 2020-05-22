import React from "react";

import * as firebase from "firebase";

export default class UpdateId extends React.Component {
  render() {
    alert("Starting");
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
                const itemData = item.docs[j].data();
                const id = item.docs[j].id;
                itemData["uid"] = id;
                firebase
                  .firestore()
                  .collection("Categories")
                  .doc(doc.id)
                  .collection("All")
                  .doc(id)
                  .set(itemData)
                  .then(() => {});
              }
            });
        }
      });
    return <div>Done</div>;
  }
}
