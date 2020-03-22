import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";
import RenderRoutes from "./RenderRoutes";

var firebaseConfig = {
  apiKey: "AIzaSyBdscpWx-mXCT-w4hNC7e5qllOVLZbu7kM",
  authDomain: "repurpose-e523f.firebaseapp.com",
  databaseURL: "https://repurpose-e523f.firebaseio.com",
  projectId: "repurpose-e523f",
  storageBucket: "repurpose-e523f.appspot.com",
  messagingSenderId: "20854007850",
  appId: "1:20854007850:web:9341e905d98100b0913b53",
  measurementId: "G-1JJPQ2KTE1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

if (
  firebase.auth().onAuthStateChanged(firebase => {
    ReactDOM.render(<RenderRoutes />, document.getElementById("root"));
  })
)
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
