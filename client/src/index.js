import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";
import RenderRoutes from "./RenderRoutes";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider, MixpanelConsumer } from "react-mixpanel";

var firebaseConfig = {
  apiKey: "AIzaSyBdscpWx-mXCT-w4hNC7e5qllOVLZbu7kM",
  authDomain: "repurpose-e523f.firebaseapp.com",
  databaseURL: "https://repurpose-e523f.firebaseio.com",
  projectId: "repurpose-e523f",
  storageBucket: "repurpose-e523f.appspot.com",
  messagingSenderId: "20854007850",
  appId: "1:20854007850:web:9341e905d98100b0913b53",
  measurementId: "G-1JJPQ2KTE1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

if (
  firebase.auth().onAuthStateChanged((firebase) => {
    mixpanel.init("22cb88fe3620168be88e70d3adf201a7");
    if (firebase && firebase.uid) {
      ReactDOM.render(
        <MixpanelProvider mixpanel={mixpanel}>
          <RenderRoutes />
        </MixpanelProvider>,
        document.getElementById("root")
      );
    } else {
      ReactDOM.render(
        <MixpanelProvider mixpanel={mixpanel}>
          <RenderRoutes />
          <MixpanelConsumer>
            {(mixpanel) => setMixpanel(mixpanel)}
          </MixpanelConsumer>
        </MixpanelProvider>,
        document.getElementById("root")
      );
    }
  })
)
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
