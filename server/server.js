const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")("sk_test_hkMGIPsjJ7Ag57pFz1eX0ASX00ijQ9oo1X");
var admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Firestore = require("@google-cloud/firestore");
const { resolve } = require("path");
var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://repurpose-e523f.firebaseio.com"
});

// admin
//   .firestore()
//   .collection("Users")
//   .doc("123@gmail.com")
//   .get()
//   .then(a => {
//     console.log(a.data());
//   })
//   .catch(e => {
//     console.log(e.message);
//   });

app.use(bodyParser.json());
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function(req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    }
  })
);

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

app.get("/", (req, res) => {
  res.send("Hello from API");
});

app.get("/public-key", (req, res) => {
  res.send({ publicKey: "pk_test_gLPSHkmFGwodXZBWMQabXaRr00jsYpn5GL" });
});

app.get("/product-details", (req, res) => {
  let data = getProductDetails();
  res.send(data);
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

// Webhook handler for asynchronous events.
app.post("/webhook", async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "payment_intent.succeeded") {
    // Fulfill any orders, e-mail receipts, etc
    console.log("💰 Payment received!");
  }

  if (eventType === "payment_intent.payment_failed") {
    // Notify the customer that their order was not fulfilled
    console.log("❌ Payment failed.");
  }

  res.sendStatus(200);
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
