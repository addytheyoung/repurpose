import React, { Component } from "react";
import * as firebase from "firebase";
import Item from "./Item";
import ItemModal from "./ItemModal";

export default class TestingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      items: [],
      modal: null,
    };

    this.loadTestData();
  }

  render() {
    if (firebase.auth().currentUser.uid != "q2SYPrnJwNhaC3PcMhE3LTZ1AIv1") {
      return null;
    } else if (!this.state.loaded) {
      return null;
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div style={{ display: !this.state.loaded ? "none" : "block" }}>
          {this.state.modal && (
            <ItemModal
              addingToCart={this.state.addingToCart}
              item={this.state.modal}
              closeModal={() => this.setState({ modal: null })}
              addToCart={(item) => this.addToCart(item)}
            ></ItemModal>
          )}
          <div
            onClick={() => this.refreshData()}
            style={{
              padding: 10,
              backgroundColor: "black",
              borderRadius: 5,
              fontWeight: 600,
              color: "white",
              width: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            REFRESH
          </div>
          <div
            onClick={() => this.submitTests()}
            style={{
              padding: 10,
              backgroundColor: "green",
              borderRadius: 5,
              fontWeight: 600,
              color: "white",
              width: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            SUBMIT TESTS
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {this.state.items.map((item, index) => {
              return (
                <Item
                  item={item}
                  index={index}
                  itemPage={(item) =>
                    this.setState({
                      modal: item,
                    })
                  }
                ></Item>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  async submitTests() {
    // 1) Add the items to my cart
    await this.addToCart(this.state.items[0]);
    await this.addToCart(this.state.items[1]);
    await this.addToCart(this.state.items[2]);
    await this.addToCart(this.state.items[3]);

    const newItems = [
      "0GDZqWg9DjhyfWP8sNTE0WQVQr5pSq",
      "0GbnzBRYzdh5jBGMhbl69oEqxeONC2",
      "0HbqiD2sXyDWanrGouZEOrAcnLg4Tl",
      "0JJrOyGxjjacuFnsbYTe46YMrdVbY5",
    ];

    // 2) Add the items to others carts
    const otherUserData = await firebase
      .firestore()
      .collection("Users")
      .doc("0GSveJ5PYaAMPnCxqgfP")
      .get();

    const myCart = otherUserData.data().cart;
    const myCartUids = otherUserData.data().cart_uids;
    for (var i = 0; i < myCart.length; i++) {
      if (newItems.includes(myCart[i].uid)) {
        alert("Item already in this users cart!");
        return;
      }
    }
    myCart.push(this.state.items[0]);
    myCartUids.push(this.state.items[0].uid);

    await firebase
      .firestore()
      .collection("Users")
      .doc("0GSveJ5PYaAMPnCxqgfP")
      .update({
        cart: myCart,
        cart_uids: myCartUids,
      });

    // 4) Remove the items
    await this.deleteItemsAndRemoveFromCart(null);
    window.location.href = "/";

    // 5) Take us to success page
  }

  // Add an item to our cart
  async addToCart(item) {
    var numCartItems = localStorage.getItem("cart");
    if (numCartItems && numCartItems != 0) {
      numCartItems = parseInt(numCartItems) + 1;
    } else {
      numCartItems = 1;
    }

    this.setState({
      addingToCart: true,
    });

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

    if (!myUid) {
      // Create a new temporary user
      const uid = this.randomNumber(20);
      localStorage.setItem("tempUid", uid);
      return await firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .set({
          cart: [item],
          cart_uids: [item.uid],
          orders: [],
          sales: [],
          temporary: true,
        })
        .then(() => {
          localStorage.setItem("cart", 1);
          window.history.replaceState(null, null, "/");

          this.setState({
            modal: null,
            addingToCart: false,
            numCartItems: 1,
          });
        });
    } else {
      return await firebase
        .firestore()
        .collection("Users")
        .doc(myUid)
        .get()
        .then((me) => {
          if (!me.exists) {
            return firebase
              .firestore()
              .collection("Users")
              .doc(myUid)
              .set({
                cart: [],
                cart_uids: [],
                temporary: true,
                orders: [],
                sales: [],
              })
              .then(() => {
                return firebase
                  .firestore()
                  .collection("Users")
                  .doc(myUid)
                  .get()
                  .then((me) => {
                    const myCart = me.data().cart;
                    const myCartUids = me.data().cart_uids;

                    for (var i = 0; i < myCart.length; i++) {
                      if (myCart[i].uid == item.uid) {
                        alert("Item already in your cart!");
                        window.history.replaceState(null, null, "/");

                        this.setState({
                          modal: null,
                          addingToCart: false,
                          numCartItems: numCartItems,
                        });

                        return;
                      }
                    }

                    myCart.push(item);
                    myCartUids.push(item.uid);

                    return firebase
                      .firestore()
                      .collection("Users")
                      .doc(myUid)
                      .update({
                        cart: myCart,
                        cart_uids: myCartUids,
                      })
                      .then(() => {
                        localStorage.setItem("cart", numCartItems);
                        window.history.replaceState(null, null, "/");
                        this.setState({
                          modal: null,
                          addingToCart: false,
                          numCartItems: numCartItems,
                        });
                      });
                  });
              });
          } else {
            const myCart = me.data().cart;
            const myCartUids = me.data().cart_uids;
            for (var i = 0; i < myCart.length; i++) {
              if (myCart[i].uid == item.uid) {
                alert("Item already in your cart!");
                window.history.replaceState(null, null, "/");
                this.setState({
                  modal: null,
                  addingToCart: false,
                  numCartItems: numCartItems,
                });
                return;
              }
            }

            myCart.push(item);
            myCartUids.push(item.uid);
            return firebase
              .firestore()
              .collection("Users")
              .doc(myUid)
              .update({
                cart: myCart,
                cart_uids: myCartUids,
              })
              .then(() => {
                localStorage.setItem("cart", numCartItems);
                window.history.replaceState(null, null, "/");
                this.setState({
                  modal: null,
                  addingToCart: false,
                  numCartItems: numCartItems,
                });
              });
          }
        });
    }
  }

  async loadTestData() {
    const firebaseRef = firebase
      .firestore()
      .collection("Categories")
      .doc("Test")
      .collection("All");
    const snapshots = (await firebaseRef.get()).docs;
    if (!snapshots || snapshots.length == 0) {
      alert("No items! Succ");
      this.refreshData();
    }

    const itemArr = [];

    for (var i = 0; i < snapshots.length; i++) {
      itemArr.push(snapshots[i].data());
    }
    this.setState({
      items: itemArr,
      loaded: true,
    });
  }

  // Reload our testing data
  async refreshData() {
    // 1) Pull random images from storage.
    const firebaseRef = firebase
      .firestore()
      .collection("Categories")
      .doc("Test")
      .collection("All");

    const x = (await firebaseRef.get()).docs;
    if (!x || x.length > 0) {
      return;
    }
    const storageRef = firebase.storage().ref().child("item_images");

    const newItems = [
      "0GDZqWg9DjhyfWP8sNTE0WQVQr5pSq",
      "0GbnzBRYzdh5jBGMhbl69oEqxeONC2",
      "0HbqiD2sXyDWanrGouZEOrAcnLg4Tl",
      "0JJrOyGxjjacuFnsbYTe46YMrdVbY5",
    ];

    const url1 = await storageRef.child(newItems[0]).getDownloadURL();
    const url2 = await storageRef.child(newItems[1]).getDownloadURL();
    const url3 = await storageRef.child(newItems[2]).getDownloadURL();
    const url4 = await storageRef.child(newItems[3]).getDownloadURL();

    var index = 0;
    for (var i = 0; i < newItems.length; i++) {
      const random = this.randomNumber(20);
      firebaseRef
        .doc(random)
        .set({
          title: i.toString(),
          original_price: 5,
          current_price: 1,
          location: "Austin, TX",
          pictures: [
            i == 0
              ? url1
              : i == 1
              ? url2
              : i == 2
              ? url3
              : i == 3
              ? url4
              : url1,
          ],
          category: "Test",
          brand: "",
          type: "",
          size: "",
          gender: "",
          sub_categories: [],
          description: "Description",
          seller: "Andrew",
          storageID: "Z",
          uid: random,
          poster_uid: firebase.auth().currentUser.uid,
          new_item: false,
          furniture: false,
        })
        .then(() => {
          index++;
          if (index == newItems.length) {
            firebase
              .firestore()
              .collection("Users")
              .doc("q2SYPrnJwNhaC3PcMhE3LTZ1AIv1")
              .update({
                cart: [],
                cart_uids: [],
              })
              .then(() => {
                firebase
                  .firestore()
                  .collection("Users")
                  .doc("0GSveJ5PYaAMPnCxqgfP")
                  .update({
                    cart: [],
                    cart_uids: [],
                  })
                  .then(() => {
                    window.location.reload();
                  });
              });
          }
        });
    }

    // 2) Create + upload the items to the firestore
    // 3) Add items to other users carts
  }

  async updateMyOrders(myUid, newOrders) {
    console.log("update my orders");
    return await firebase.firestore().collection("Users").doc(myUid).update({
      orders: newOrders,
    });
  }

  async updatingProfile(item) {
    console.log("updating profile");
    return await firebase
      .firestore()
      .collection("Categories")
      .doc(item.category)
      .collection("All")
      .doc(item.uid)
      .update({ deleting_now: true });
  }

  async deleteItemFromDatabase(item) {
    console.log("delete item");
    return await firebase
      .firestore()
      .collection("Categories")
      .doc(item.category)
      .collection("All")
      .doc(item.uid)
      .delete();
  }

  async findUsersWithSameItems(cartUids) {
    console.log("Find users with saem items");
    return await firebase
      .firestore()
      .collection("Users")
      .where("cart_uids", "array-contains-any", cartUids)
      .get();
  }

  async updateUsersCart(userData, newCart, cartUids) {
    console.log("update users cart");
    console.log(userData);
    console.log(newCart);
    console.log(cartUids);
    return await firebase
      .firestore()
      .collection("Users")
      .doc(userData.id)
      .update({
        cart: newCart,
        cart_uids: cartUids,
      });
  }

  async updateOrdersCollection(tempCart) {
    console.log("update orders collection");
    // Go through and add all the unique ID's to seller_array
    const sellerArray = [];
    tempCart.forEach((uniqueItem) => {
      const seller = uniqueItem.seller;
      console.log(seller);
      if (!sellerArray.includes(seller)) {
        console.log("Pushing seler", seller);
        sellerArray.push(seller);
      }
    });
    console.log("setting");

    return await firebase.firestore().collection("Orders").doc().set({
      items: tempCart,
      seller_array: sellerArray,
    });
  }

  // Delete items from my and other users carts, and remove it from our database
  async deleteItemsAndRemoveFromCart() {
    console.log("starting delete");
    const myData = (
      await firebase
        .firestore()
        .collection("Users")
        .doc("q2SYPrnJwNhaC3PcMhE3LTZ1AIv1")
        .get()
    ).data();
    const cart = myData.cart;
    const cartUids = myData.cart_uids;
    var tempCart = JSON.parse(JSON.stringify(cart));

    // 1) Add the address to our orders. This is used so I can see where to take the items.
    for (var i = 0; i < tempCart.length; i++) {
      tempCart[i]["address"] = "2414 Longview St.";
      tempCart[i]["address2"] = "";
    }

    // 2) Get myuid
    var myUid = null;
    if (firebase.auth().currentUser) {
      myUid = firebase.auth().currentUser.uid;
    } else if (localStorage.getItem("tempUid")) {
      myUid = localStorage.getItem("tempUid");
    } else {
      myUid = null;
    }

    // 3) Update my orders
    const orders = myData.orders;
    var newOrders = orders.concat(tempCart);
    await this.updateMyOrders(myUid, newOrders);

    // 4) Loop thorugh our own cart and deal with the items
    for (var i = 0; i < cart.length; i++) {
      const item = cart[i];
      // Update this item in firebase
      await this.updatingProfile(item);

      // Delete the item from firebase
      await this.deleteItemFromDatabase(item);
    }

    // 5) Find any users with an item we have in our cart
    const snapshots = await this.findUsersWithSameItems(cartUids);

    console.log(snapshots);
    const userDocs = snapshots.docs;
    console.log(userDocs);

    const itemUids = [];
    for (var i = 0; i < cart.length; i++) {
      itemUids.push(cart[i].uid);
    }
    // Loop through users with an item in their cart
    for (var k = 0; k < userDocs.length; k++) {
      console.log("looping");
      const userData = userDocs[k];
      const newCart = userData.data().cart;
      const cartUids = userData.data().cart_uids;
      // All the items in a users cart
      for (var p = 0; p < newCart.length; p++) {
        console.log("looping2");
        // All the items we are looking for
        var l = 0;
        while (l < itemUids.length) {
          console.log("looping3");
          const myItemUid = itemUids[l];
          if (!newCart[p]) {
            break;
          }
          if (newCart[p].uid === myItemUid) {
            l = 0;
            // Remove the item
            console.log("Removing!");
            newCart.splice(p, 1);
            cartUids.splice(p, 1);
          }
          l++;
        }
      }

      // 6) Update the users cart with the new cart
      await this.updateUsersCart(userData, newCart, cartUids);

      // 7) Add to our orders collection
      await this.updateOrdersCollection(tempCart);
      console.log("After updateOrders");
    }

    console.log("DONE!!!!!");
    localStorage.setItem("cart", "0");
  }

  randomNumber(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
