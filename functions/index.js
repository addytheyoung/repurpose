const functions = require("firebase-functions");
const env = require("dotenv").config({ path: "./.env" });
const puppeteer = require("puppeteer");

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
const paypal = require("paypal-rest-sdk");
const engines = require("consolidate");
const { random } = require("lodash");
const { rejects } = require("assert");

app.engine("ejs", engines.ejs);
app.set("views", "../views");
app.set("view engine", "ejs");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://repurpose-e523f.firebaseio.com",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

paypal.configure({
  mode: "live",
  client_id:
    "AVWKPfLbUrnVVHtF3EqllXbIqqAhJvRrlwa9vVi4k_uFGT4Jcd7TSsWxXKdGED5B66RNcrczgnnISVLk",
  client_secret:
    "EEzWM8KQhmRtcG1cucS6vcMTvZqGFMx3yx6dJFMR5UM6W35wZ9YXqAr1TgYidgIoYGvx7bliibINumcz",
  // mode: "sandbox",
  // client_id:
  //   "AebrbuffsMy8souGrrTS02XFMu0XN7MrbbtmXfII-fNIcVz9FE0ndArXMXrJzIw2EdVhGW-fXWbi_Kmn",
  // client_secret:
  //   "EOEcKQIWhapQNGGrW6MQFrqSogkHlLM6pB49DNc4ImeK83TT2wI9o55o0UI9M6XYvpxZ3N1fEq-88cYs",
});

app.get("/test", (req, res) => {
  res.send({ working: "Working!" });
});

app.get("/paypal-page", (req, res) => {
  res.render("index");
});

app.get("/paypal-cancel", (req, res) => {
  res.render("cancel");
});

app.post("/paypal", (req, res) => {
  console.log("fetched paypal");
  // const create_payment_json = req.body.json;
  // console.log("\n\n\nREQ BODYYYYY\n\n\n");

  const price = req.body.pricename;
  const type = req.body.type;
  console.log(type);

  console.log(price);

  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      // return_url: "http://localhost:4242/paypal-success",
      return_url:
        "http://localhost:4242/paypal-success/?type=" +
        type +
        "&total=" +
        price,
      cancel_url:
        type === "desktop"
          ? "http://localhost:3000/checkout"
          : "http://localhost:4242/paypal-cancel",
    },
    note_to_payer:
      "We do NOT use the shipping address here. We use the address you gave us in the previous form. Ignore the shipping address here.",

    transactions: [
      {
        amount: {
          currency: "USD",
          total: price,
          details: {
            subtotal: price,
            tax: "0",
            shipping: "0",
          },
        },
        description:
          "We do NOT use the shipping address here. We use the address you gave us in the previous form. Ignore the shipping",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      res.redirect(payment.links[1].href);
    }
  });
});

app.get("/paypal-success", async (req, res) => {
  var PayerID = req.query.PayerID;
  var paymentId = req.query.paymentId;
  const type = req.query.type;
  const total = req.query.total;
  console.log("Success");
  console.log(type);
  console.log(total);

  var execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: total,
        },
      },
    ],
  };
  await paypal.payment.execute(paymentId, execute_payment_json, function (
    error,
    payment
  ) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));

      if (type == "desktop") {
        res.redirect("http://localhost:3000/checkout/?success=true");
      } else {
        res.render("success");
      }
    }
  });
});

app.post("/create-source", async (req, res) => {
  const token = req.body.token;
  console.log("\n\nPARAMS **\n\n");
  console.log(token);

  try {
    const x = await stripe.sources.create({
      type: "card",
      token: token.tokenId,
    });
    res.json(x);
  } catch (err) {
    console.log("\n\nERROR:****\n\n");
    console.log(err);
  }
});

app.post("/charge-card", async (req, res) => {
  try {
    const x = await stripe.charges.create({
      amount: 100,
      currency: "usd",
      source: req.body.source,
      description: "Yoyoyo",
    });
    res.json(x);
  } catch (err) {
    res.json(err);
  }
});

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
  amount = parseInt(amount * 100);

  const options = {
    payment_method_types: ["card"],
    transfer_group: "abcdef",
    amount: amount,
    currency: "usd",
    description: "An item bought from Tate's Crate",
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create(options);
    res.json(paymentIntent);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.post("/post-to-fb", async (req, res) => {
  const item = req.body.item;
  console.log("before func");
  const x = await postToFb(item);
  res.send(x);
});

app.post("/fetch-item-price", async (req, res) => {
  console.log("CALLING FETCH PRICES");
  const string = req.body.total;
  const search = string.split();
  console.log("Fetch");
  query = "";
  for (let i = 2; i < search.length; i++) {
    query += search[i] + " ";
  }
  url =
    "https://www.google.com/search?tbm=shop&ei&q=" + string.replace(" ", "%20");

  await Promise.all([
    scrapeProduct(url),
    // scrapeProduct(url),
    // scrapeProduct(url),
    // scrapeProduct(url),
  ])
    .then((values) => {
      // console.log("values: " + values);
      var arr = [];
      for (var i = 0; i < values.length; i++) {
        arr = arr.concat(values[i]);
      }

      res.json(arr);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Create a stripe customer
app.post("/create-stripe-customer", async (req, res) => {
  const email = req.body.email;
  console.log(email + "**");
  try {
    const customer = await stripe.customers.create({
      email: email,
    });
    res.json(customer);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Charge a stripe customer
app.post("/charge-stripe-customer", async (req, res) => {
  const total = req.body.total;
  const customer = req.body.customer;
  console.log(total);
  console.log(customer);
  try {
    const charge = await stripe.charges.create({
      amount: total * 100,
      currency: "usd",
      customer: customer,
    });

    res.json(charge);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Create a stripe customer card
app.post("/create-customer-card", async (req, res) => {
  const customerId = req.body.customerId;
  const cardToken = req.body.cardToken;

  try {
    const card = await stripe.customers.createSource(customerId, {
      source: cardToken,
    });
    res.json(card);
  } catch (err) {
    console.log(err);
    res.json(err);
  }

  return;
});

// Update the stripe customers card
app.post("/update-customer-card", async (req, res) => {
  const customerId = req.body.customerId;
  const cardToken = req.body.cardToken;

  try {
    const newCustomer = await stripe.customers.update(customerId, {
      default_source: cardToken,
    });

    res.json(newCustomer);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// "app" end
// Functions down here

async function postToFb(item) {
  console.log("posting");
  const url = "https://www.facebook.com/marketplace/create";
  const firebase_url =
    "https://console.firebase.google.com/u/0/project/repurpose-e523f/database/firestore/data~2FCategories~2FArt%20&%20Decoration";
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1000 });
  await page.goto(firebase_url, { waitUntil: "networkidle0" });
  await page.waitFor(5000);
  await page.click("#identifierId");
  await page.type("#identifierId", "andrewtateyoung@gmail.com");
  await page.waitFor(1000);
  await page.click("#identifierNext");
  // const email = "andrewtateyoung@gmail.com";
  // const password = "Smash#0831";
  // await page.waitFor("#email");
  // await page.waitFor("#pass");
  // await page.type("#email", email, { delay: 120 });
  // await page.type("#pass", password, { delay: 120 });
  // await page.click("#u_0_2");
  // await page.waitFor(5000);
  // await page.goto("https://www.facebook.com/marketplace/create/item/");
  // await page.waitFor(5000);
  return "x";
}

async function scrapeProduct(url) {
  console.log("scraping: " + url);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  console.log("browser");
  const page = await browser.newPage();
  console.log("page");
  await page.goto(url);
  console.log("goto page");
  let texts = await page.evaluate(() => {
    console.log("texts promise");
    let data = [];
    let elements = document.getElementsByClassName("Nr22bf");
    for (var element of elements) data.push(element.textContent);
    return data;
  });

  browser.close();
  console.log("return text");
  return texts;
}

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));

exports.app = functions.https.onRequest(app);

exports.dropPrices = functions.pubsub
  .schedule("every 12 hours from 6:00 to 23:00")
  .timeZone("America/New_York")
  .onRun((context) => {
    const categoryList = [
      "Art & Decoration",
      "Books",
      "Clothing, Shoes, & Accessories",
      "Electronics",
      "Home",
      "Garden",
      "Pet Supplies",
      "Sports & Hobbies",
      "Toys & Games",
      "Everything Else",
    ];

    const priceList = [1.0, 0.9, 0.8, 0.7];

    // 0) The longer the item has been in the store, it's more likely to drop, and with a higher drop %
    // 1) Grab 8 random items with lower discounted items more likely to be grabbed.
    for (var i = 0; i < 4; i++) {
      // Choose categories and prices at random.
      const currentCategory =
        categoryList[Math.floor(Math.random() * categoryList.length)];
      const randomPrice1 =
        priceList[Math.floor(Math.random() * priceList.length)];
      const randomPrice2 =
        priceList[Math.floor(Math.random() * priceList.length)];
      const currentPriceArray = [randomPrice1, randomPrice2];
      const collectionRef = admin
        .firestore()
        .collection("Categories")
        .doc(currentCategory)
        .collection("All");

      collectionRef
        .where("location", "==", "Austin, TX")
        .where("current_price", "in", currentPriceArray)
        .orderBy("uid")
        .get()
        .then((snapshot) => {
          // Number of items in our collection. Choose one at random
          console.log(snapshot.docs.length);
          console.log(Math.floor(Math.random() * snapshot.docs.length));
          console.log(
            snapshot.docs[Math.floor(Math.random() * snapshot.docs.length)]
          );
          console.log(
            snapshot.docs[
              Math.floor(Math.random() * snapshot.docs.length)
            ].data()
          );
          const numItems = snapshot.docs.length;
          const randomItem1 = snapshot.docs[
            Math.floor(Math.random() * numItems)
          ].data();
          const randomItem2 = snapshot.docs[
            Math.floor(Math.random() * numItems)
          ].data();

          // Get the current discount
          const itemDiscount1 = randomItem1.current_price;
          const itemDiscount2 = randomItem2.current_price;

          var newDiscount1 = itemDiscount1 - 0.2;
          var newDiscount2 = itemDiscount2 - 0.2;

          if (newDiscount1 == 0.8) {
            newDiscount1 = 0.7;
          }
          if (newDiscount1 == 0.1) {
            newDiscount1 = 0.2;
          }
          if (newDiscount2 == 0.8) {
            newDiscount2 = 0.7;
          }
          if (newDiscount2 == 0.1) {
            newDiscount2 = 0.2;
          }

          collectionRef.doc(randomItem1.uid).update({
            current_price: newDiscount1,
            new_discount: true,
          });

          collectionRef.doc(randomItem2.uid).update({
            current_price: newDiscount2,
            new_discount: true,
          });
        });
    }

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
      to: "andrew@collection.deals",
      subject: "CRON: New discounts ADDED.",
      text: "CRON: New discounts ADDED.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return null;
  });

exports.removePriceDropTag = functions.pubsub
  .schedule("every 48 hours")
  .timeZone("America/New_York")
  .onRun((context) => {
    return;
    const categoryList = [
      "Art & Decoration",
      "Books",
      "Clothing, Shoes, & Accessories",
      "Electronics",
      "Home",
      "Garden",
      "Pet Supplies",
      "Sports & Hobbies",
      "Toys & Games",
      "Everything Else",
    ];
    // Remove the tags of old items, and put in new tags every time this runs
    const collectionRef = admin
      .firestore()
      .collection("Categories")
      .doc(currentCategory)
      .collection("All");

    for (var i = 0; i < categoryList.length; i++) {
      const currentCategory = categoryList[i];
      collectionRef
        .where("new_discount", "==", true)
        .orderBy("uid")
        .get()
        .then((snapshot) => {
          i_index++;
          const docs = snapshot.docs;
          for (var j = 0; j < docs.length; j++) {
            numRemoved++;
            const doc = docs[j];
            collectionRef.doc(doc.id).update({
              new_discount: false,
            });
          }
        });
    }

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
      to: "andrew@collection.deals",
      subject: "CRON: New discounts REMOVED.",
      text: "CRON: New discounts REMOVED.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return null;
  });
