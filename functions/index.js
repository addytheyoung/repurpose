const functions = require("firebase-functions");
const env = require("dotenv").config({ path: "./.env" });
const puppeteer = require("puppeteer");
// const stripe = require("stripe")("rk_live_jwpHKngcsUmcz9gHths0I1ZX003cKwZQQl");
const stripe = require("stripe")("sk_live_MUbbkQ150n00y57q1tjlwWQM00s213LRkP");
// const stripe = require("stripe")("sk_test_hkMGIPsjJ7Ag57pFz1eX0ASX00ijQ9oo1X");
// const paypal = EExwl4bt3FO-Vl7714Qh71y0lUpwnkCNm-1_vk7kKTMD4WIH4hH61OwwxOhijkn2dTk6kd2pKB8cl1WT
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

app.post("/send-email", (req, res) => {
  const email = req.body.email;
  const meeting = req.body.meeting;
  console.log(email);
  console.log(meeting);
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "andrew@collection.deals",
      pass: "Collection#0831",
    },
  });

  var mailOptions = {
    from: "andrew@collection.deals",
    to: email,
    subject: "Collection: See you soon!",
    text: meeting,
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
  console.log("MAKE SELLER");
  console.log(body);
  try {
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: body.code,
    });
    console.log(response);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.get("/public-key", (req, res) => {
  res.send({ publicKey: "sk_live_MUbbkQ150n00y57q1tjlwWQM00s213LRkP" });
});

app.get("/product-details", (req, res) => {
  let data = getProductDetails();
  res.send(data);
});

app.get("/customer", (req, res) => {
  // stripe.customers.retrieve("cus_Gz1cqDiR9R8g7V", function (err, customer) {

  // });
  stripe.customers.create(
    {
      description: "A customer of collection",
    },
    function (err, customer) {
      console.log(err);
      console.log(customer);
      res.send(customer);
    }
  );
});

app.post("/create-transfers", async (req, res) => {
  const body = req.body;
  const seller = body.seller.seller;
  const cost = body.seller.cost;
  const worker = body.seller.worker;
  if (worker) {
    const options = {
      amount: cost * 100 * 0.6,
      currency: "usd",
      destination: seller,
      transfer_group: "abcdef",
    };
    try {
      const paymentIntent = await stripe.transfers.create(options);
      res.json(paymentIntent);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  } else {
    const options = {
      amount: cost * 100 * 0.3,
      currency: "usd",
      destination: seller,
      transfer_group: "abcdef",
    };
    try {
      const paymentIntent = await stripe.transfers.create(options);
      res.json(paymentIntent);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
});

app.post("/create-payment-intent", async (req, res) => {
  const body = req.body;
  var amount = body.total;
  const productDetails = getProductDetails();
  amount = parseInt(amount * 100);

  const options = {
    payment_method_types: ["card"],
    transfer_group: "abcdef",
    amount: amount,
    currency: productDetails.currency,
    description: productDetails.description,
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create(options);
    console.log("Res payment int");
    res.json(paymentIntent);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.post("/fetch-item-price", async (req, res) => {
  const string = req.body.total;
  const search = string.split();
  console.log(search);
  query = "";
  for (let i = 2; i < search.length; i++) {
    query += search[i] + " ";
  }
  console.log(string);
  url =
    "https://www.google.com/search?tbm=shop&ei&q=" + string.replace(" ", "%20");
  console.log(url);
  try {
    const x = await scrapeProduct(url);
    res.send(x);
  } catch (err) {
    res.json(err);
  }
});

async function scrapeProduct(url) {
  console.log("function");
  const browser = await puppeteer.launch();
  console.log("browser");
  const page = await browser.newPage();
  console.log("page");
  await page.goto(url);
  console.log("url");
  let texts = await page.evaluate(() => {
    let data = [];
    let elements = document.getElementsByClassName("Nr22bf");
    for (var element of elements) data.push(element.textContent);
    return data;
  });
  browser.close();
  return texts;
}

let getProductDetails = (myData) => {
  return {
    currency: "usd",
    amount: 1000,
    description: "An item bought from collection.",
  };
};

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));

exports.app = functions.https.onRequest(app);
