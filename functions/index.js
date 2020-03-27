const functions = require("firebase-functions");
const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")("sk_test_hkMGIPsjJ7Ag57pFz1eX0ASX00ijQ9oo1X");
var admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Firestore = require("@google-cloud/firestore");
const { resolve } = require("path");
var serviceAccount = require("./key.json");

app.get("/customer", (req, res) => {
  stripe.customers.retrieve("cus_Gz1cqDiR9R8g7V", function(err, customer) {
    console.log(customer);
  });
  // stripe.customers.create(
  //   {
  //     description: "My First Test Customer (created for API docs)"
  //   },
  //   function(err, customer) {
  //     res.send(customer);
  //   }
  // );
});

exports.app = functions.https.onRequest(app);
