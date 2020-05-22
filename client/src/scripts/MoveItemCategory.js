import React from "react";
import * as firebase from "firebase";

export default function MoveItemCategory(old_category, new_category, oldItem) {
  oldItem["category"] = new_category;

  firebase
    .firestore()
    .collection("Categories")
    .doc(old_category)
    .collection("All")
    .doc(oldItem.uid)
    .delete()
    .then(() => {
      firebase
        .firestore()
        .collection("Categories")
        .doc(new_category)
        .collection("All")
        .doc(oldItem.uid)
        .set(oldItem)
        .then(() => {
          window.location.reload();
        });
    });
}
