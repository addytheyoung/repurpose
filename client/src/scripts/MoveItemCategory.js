import React from "react";
import * as firebase from "firebase";

export default class MoveItemCategory extends React.Component {
  constructor(props) {
    super(props);
    var old_category = "Books";
    var new_category = "Test";
    var item_id = "jsJiyfUxBr9WM3zq2FNIwK4rAXQ2Ng";
    firebase
      .firestore()
      .collection("Categories")
      .doc(old_category)
      .collection("All")
      .doc(item_id)
      .get()
      .then((item) => {
        var item_data = item.data();
        item_data["category"] = new_category;

        firebase
          .firestore()
          .collection("Categories")
          .doc(old_category)
          .collection("All")
          .doc(item_id)
          .delete()
          .then(() => {
            firebase
              .firestore()
              .collection("Categories")
              .doc(new_category)
              .collection("All")
              .doc(item_id)
              .set(item_data)
              .then(() => {
                alert("Done");
              });
          });
      });
  }

  render() {
    return <div>s</div>;
  }
}
