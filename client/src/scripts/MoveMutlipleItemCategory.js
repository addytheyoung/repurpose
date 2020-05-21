import React from "react";
import * as firebase from "firebase";

export default class MoveMultipleItemCategory extends React.Component {
  constructor(props) {
    super(props);
    var old_category = "Art & Decoration";
    var new_category = "Sports & Hobbies";
    var ids = [
      "FE32Yh3bq9L5A7AaRo9c",
      "HjSVwPWy2A4USe5lZntP",
      "MSYvBnmfhNEgTTmMLLBq",
      "VrXYoDopTUuTyX6Tz4sI",
      "Z8q1nDxy2Fo1AcjGunNL",
      "wtXVm7JwkSr3Rf2tKcTg",
    ];
    var i_index = 0;
    alert("Ready?");
    for (var i = 0; i < ids.length; i++) {
      const item_id = ids[i];
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
                  i_index++;
                  if (i_index == ids.length) {
                    alert("Done");
                  }
                });
            });
        });
    }
  }

  render() {
    return <div>s</div>;
  }
}
