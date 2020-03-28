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

app.get("/public-key", (req, res) => {
  res.send({ publicKey: "pk_test_gLPSHkmFGwodXZBWMQabXaRr00jsYpn5GL" });
});

app.get("/product-details", (req, res) => {
  let data = getProductDetails();
  res.send(data);
});

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

app.post("/create-payment-intent", async (req, res) => {
  const body = req.body;
  const productDetails = getProductDetails();

  const options = {
    ...body,
    amount: productDetails.amount,
    currency: productDetails.currency,
    description: productDetails.description
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create(options);
    res.json(paymentIntent);
  } catch (err) {
    res.json(err);
  }
});

let getProductDetails = () => {
  return {
    currency: "usd",
    amount: 900,
    description: "dqdqwdqwdq"
  };
};

exports.app = functions.https.onRequest(app);
