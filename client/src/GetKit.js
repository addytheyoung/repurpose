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

    const randomNum = this.randomNumber(20);

    if (code == "mailed") {
      firebase
        .firestore()
        .collection("Users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          seller: true,
          mail_check: true,
          paypal: false,
          stripe_user_id: randomNum,
        })
        .then(() => {
          localStorage.setItem("stripe_user_id", randomNum);
          localStorage.setItem("sell_type", "mailed");
          window.location.href = "/sell/kit";
        });
    } else if (code == "paypal") {
      firebase
        .firestore()
        .collection("Users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          seller: true,
          mail_check: false,
          paypal: true,
          stripe_user_id: localStorage.getItem("stripe_user_id"),
        })
        .then(() => {
          window.location.href = "/sell/kit";
        });
    } else {
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
              mail_check: false,
              paypal: false,
              stripe_user_id: a.stripe_user_id,
            })
            .then(() => {
              localStorage.setItem("stripe_user_id", a.stripe_user_id);
              localStorage.setItem("sell_type", "stripe");
              window.location.href = "/sell/kit";
            });
        })
        .catch((e) => {
          console.log(e.message);
        });
    }

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
