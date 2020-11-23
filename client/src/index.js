import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";
import RenderRoutes from "./RenderRoutes";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider, MixpanelConsumer } from "react-mixpanel";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <MixpanelProvider mixpanel={mixpanel}>
    <RenderRoutes />
    <MixpanelConsumer>{(mixpanel) => setMixpanel(mixpanel)}</MixpanelConsumer>
  </MixpanelProvider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function setMixpanel(mixpanel) {
  //  Mixpanel shit
  // var USER_ID = "mix_user_" + randomNumber(10);
  // var USER_SIGNUP_DATE = new Date();
  // mixpanel.identify(USER_ID);
  // mixpanel.people.set({
  //   "Sign up date": USER_SIGNUP_DATE,
  //   USER_ID: USER_ID,
  // });
}

function randomNumber(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
