import React from "react";

import * as firebase from "firebase";

export default class Charge extends React.Component {
  constructor(props) {
    super(props);

    var myUid = null;
    if (firebase.auth().currentUser) {
      // Signed in
      myUid = firebase.auth().currentUser.uid;
    } else if (localStorage.getItem("tempUid")) {
      // temporarily signed in
      myUid = localStorage.getItem("tempUid");
    } else {
      // Not signed in
      myUid = null;
    }
    firebase
      .firestore()
      .collection("Users")
      .doc(myUid)
      .get()
      .then((me) => {
        this.setState({
          myData: me.data(),
          loaded: true,
        });
      });
    this.state = {
      myData: null,
      loaded: false,
    };
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    var myUid = null;
    if (firebase.auth().currentUser) {
      // Signed in
      myUid = firebase.auth().currentUser.uid;
    } else if (localStorage.getItem("tempUid")) {
      // temporarily signed in
      myUid = localStorage.getItem("tempUid");
    } else {
      // Not signed in
      myUid = null;
    }

    const cart = this.state.myData.cart;
    const itemUids = [];
    for (var i = 0; i < cart.length; i++) {
      itemUids.push(cart[i].uid);
    }

    var a_index = 0;
    for (var i = 0; i < cart.length; i++) {
      const item = cart[i];

      // Deleted all items from database
      firebase
        .firestore()
        .collection("Categories")
        .doc(item.category)
        .collection("All")
        .doc(item.uid)
        .get()
        .then(() => {
          a_index++;
          if (a_index === cart.length) {
            firebase
              .firestore()
              .collection("Users")
              .where("cart", "array-contains-any", cart)
              .get()
              .then((user) => {
                const userDocs = user.docs;
                console.log(userDocs.length);
                if (userDocs.length === 0) {
                  // Shouldn't be, i'm removing from my own cart
                }
                var b_index = 0;
                var k = 0;
                var looping = true;

                // All the users with an item in their cart

                for (var k = 0; k < userDocs.length; k++) {
                  const userData = userDocs[k];

                  const newCart = userData.data().cart;
                  console.log(newCart);
                  // All the items in a users cart
                  for (var p = 0; p < newCart.length; p++) {
                    // All the items we are looking for
                    var l = 0;
                    while (l < itemUids.length) {
                      if (!newCart[p]) {
                        break;
                      }
                      if (newCart[p].uid === itemUids[l]) {
                        console.log("splicing array");
                        l = 0;
                        // Remove the item
                        newCart.splice(p, 1);
                      }
                      l++;
                    }
                  }
                  console.log(newCart);
                  firebase
                    .firestore()
                    .collection("Users")
                    .doc(userData.id)
                    .update({
                      cart: newCart,
                    })
                    .then(() => {
                      b_index++;
                      if (b_index === userDocs.length) {
                        alert("DONE!");
                      }
                    });
                }
              });
          }
        });
    }

    return <div>s</div>;
  }
}
