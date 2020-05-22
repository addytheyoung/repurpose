import React from "react";
import * as firebase from "firebase";

export default class MoveToOrders extends React.Component {
  constructor(props) {
    super(props);
    firebase
      .firestore()
      .collection("Users")
      .doc("toPdG3sXQwXj4H9eagO4")
      .get()
      .then((item) => {
        const orders = item.data().orders;
        firebase
          .firestore()
          .collection("Orders")
          .doc()
          .set({ items: orders })
          .then(() => {
            alert("Done");
            window.location.href = "/";
          });
      });
  }
  render() {
    return <div>ddd</div>;
  }
}
