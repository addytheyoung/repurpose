import React from "react";
import * as firebase from "firebase";

export default class MoveCategoryCategory extends React.Component {
  constructor(props) {
    super(props);
    var old_category = "Toys & Hobbies";
    var new_category = "Toys & Games";
    alert("Ready?");
    firebase
      .firestore()
      .collection("Categories")
      .doc(old_category)
      .collection("All")
      .get()
      .then((items) => {
        const itemDocs = items.docs;

        var i_index = 0;
        for (var i = 0; i < itemDocs.length; i++) {
          var itemData = itemDocs[i].data();
          itemData["category"] = new_category;

          firebase
            .firestore()
            .collection("Categories")
            .doc(new_category)
            .collection("All")
            .doc()
            .set(itemData)
            .then(() => {
              i_index++;
              if (i_index == itemDocs.length) {
                alert("Done");
              }
            });
        }
      });
  }

  render() {
    return <div>s</div>;
  }
}
