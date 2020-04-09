const functions = require("firebase-functions");
const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")("sk_test_hkMGIPsjJ7Ag57pFz1eX0ASX00ijQ9oo1X");
var admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
const app = express();
const Firestore = require("@google-cloud/firestore");
const { resolve } = require("path");
var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://repurpose-e523f.firebaseio.com",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/send-email", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "andrewtateyoung@gmail.com",
      pass: "Smash#0831",
    },
  });

  var mailOptions = {
    from: "andrewtateyoung@gmail.com",
    to: "andrewtateyoung@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.post("/make-seller", async (req, res) => {
  const body = req.body;

  try {
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: body.code,
    });
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

app.get("/public-key", (req, res) => {
  res.send({ publicKey: "pk_test_gLPSHkmFGwodXZBWMQabXaRr00jsYpn5GL" });
});

app.get("/product-details", (req, res) => {
  let data = getProductDetails();
  res.send(data);
});

app.get("/customer", (req, res) => {
  stripe.customers.retrieve("cus_Gz1cqDiR9R8g7V", function (err, customer) {});
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
  console.log(body);

  const productDetails = getProductDetails();

  const options = {
    payment_method_types: ["card"],
    amount: body.total * 100,
    currency: productDetails.currency,
    description: productDetails.description,
    // transfer_data: {
    //   destination: "a",
    // },
  };
  console.log(options);

  try {
    const paymentIntent = await stripe.paymentIntents.create(options);
    res.json(paymentIntent);
  } catch (err) {
    res.json(err);
  }
});

let getProductDetails = (myData) => {
  return {
    currency: "usd",
    amount: 1000,
    description: "dqdqwdqwdq",
  };
};

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));

exports.app = functions.https.onRequest(app);
