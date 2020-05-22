import * as firebase from "firebase";

export default function updatePrice(item, price, category) {
  firebase
    .firestore()
    .collection("Categories")
    .doc(category)
    .collection("All")
    .doc(item.uid)
    .update({
      original_price: price,
    })
    .then(() => {
      window.location.reload();
    })
    .catch((e) => {
      alert(e.message);
    });
}
