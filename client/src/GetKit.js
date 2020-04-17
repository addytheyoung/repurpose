import React from "react";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import api from "./api";

export default class GetKit extends React.Component {
  constructor(props) {
    super(props);

    var code = "";
    const url = window.location.href;
    for (var i = 0; i < url.length; i++) {
      if (url[i] === "=") {
        code = url.substring(i + 1, url.length);
      }
    }
    console.log(code);
    console.log(firebase.auth().currentUser);

    api
      .createSeller({ code: code })
      .then((a) => {
        console.log(a);
        firebase
          .firestore()
          .collection("Users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            seller: true,
            stripe_user_id: a.stripe_user_id,
          })
          .then(() => {
            localStorage.setItem("stripe_user_id", a.stripe_user_id);
            window.location.href = "/sell/kit";
          });
      })
      .catch((e) => {
        console.log(e.message);
      });

    this.state = {
      loaded: false,
      code: code,
    };
  }
  render() {
    if (!this.state.loaded) {
      return (
        <div
          style={{
            position: "absolute",
            left: "45vw",
            top: 200,
          }}
        >
          <ClipLoader
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }
    return (
      <div>
        <div>
          <HeaderBar />
        </div>
      </div>
    );
  }
}
