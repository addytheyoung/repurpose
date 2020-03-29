const createSeller = options => {
  return window
    .fetch(`/make-seller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(options)
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        throw Error("API Error");
      } else {
        return data;
      }
    });
};

const createCustomer = options => {
  return window
    .fetch(`/customer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        throw Error("API Error");
      } else {
        return data;
      }
    });
};

const createPaymentIntent = options => {
  return window
    .fetch(`/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(options)
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        throw new Error("PaymentIntent API Error");
      } else {
        return data.client_secret;
      }
    });
};

const getProductDetails = cart => {
  console.log(cart);
  const subTotal = getSubtotal(cart);
  const tax = getTax(subTotal);
  const shipping = getShipping(subTotal);
  const total = parseInt((parseInt(subTotal) + tax + shipping) * 100) / 100;
  return {
    subTotal: subTotal,
    description: cart.description,
    pictures: cart.pictures,
    tax: tax,
    shipping: shipping,
    total: total,
    currency: "usd",
    amount: total,
    description: "dqdqwdqwdq"
  };
  console.log(total);
  return window
    .fetch(`/product-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        throw Error("API Error");
      } else {
        return data;
      }
    });
};

const getPublicStripeKey = options => {
  return window
    .fetch(`/public-key`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        console.log("API error:", { data });
        throw Error("API Error");
      } else {
        return data.publicKey;
      }
    });
};

const getSubtotal = cart => {
  var totalPrice = 0;
  for (var i = 0; i < cart.length; i++) {
    const price = cart[i].original_price;
    totalPrice += price;
  }
  return ((totalPrice / 100) * 100).toFixed(2);
};

const getTax = price => {
  return parseInt(price * 0.08 * 100) / 100;
};

const getShipping = price => {
  return 3.12;
};

const api = {
  createSeller: createSeller,
  createPaymentIntent,
  createCustomer: createCustomer,
  getPublicStripeKey: getPublicStripeKey,
  getProductDetails: getProductDetails
};

export default api;
