require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const router = express.Router();

// Middleware to capture raw body for HMAC verification
router.use((req, res, next) => {
  req.rawBody = "";
  req.on("data", (chunk) => {
    req.rawBody += chunk;
  });
  req.on("end", () => {
    next();
  });
});

// JSON body parser, added after raw body middleware
router.use(express.json({ type: "application/json" }));

// Middleware for HMAC verification
const verifyHmac = (req, res, next) => {
  const hmac = req.get("X-Shopify-Hmac-Sha256");

  if (!hmac || !req.rawBody) {
    console.error("HMAC or raw body missing");
    return res.status(400).send("HMAC or raw body missing");
  }

  const generatedHmac = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(req.rawBody, "utf8")
    .digest("base64");

  if (generatedHmac === hmac) {
    console.log("HMAC verification successful");
    next(); // Proceed to the route handler
  } else {
    console.error("Webhook verification failed");
    res.status(401).send("Webhook verification failed");
  }
};

// Route for product updates
router.post("/product-update", verifyHmac, (req, res) => {
  console.log("Received Product Update Webhook:", req.body);
  res.sendStatus(200); // Acknowledge receipt

  // Asynchronous processing of webhook data
  setImmediate(() => {
    try {
      processWebhook(req.body);
      console.log("Product update webhook processed successfully.");
    } catch (error) {
      console.error("Error processing product update webhook:", error);
    }
  });
});

// Route for customer data requests
router.post("/customer-data-request", verifyHmac, (req, res) => {
  console.log("Received Customer Data Request Webhook:", req.body);
  res.sendStatus(200);
  // Additional data handling logic
});

// Route for customer data erasure
router.post("/customer-data-erasure", verifyHmac, (req, res) => {
  console.log("Received Customer Data Erasure Webhook:", req.body);
  res.sendStatus(200);
  // Additional erasure handling logic
});

// Route for shop data erasure
router.post("/shop-data-erasure", verifyHmac, (req, res) => {
  console.log("Received Shop Data Erasure Webhook:", req.body);
  res.sendStatus(200);
  // Additional erasure handling logic
});

// Function to process product update webhook data
const processWebhook = (data) => {
  try {
    console.log("Processing webhook data:", data);
    // Implement any processing logic here
  } catch (error) {
    console.error("Error processing webhook data:", error);
  }
};

module.exports = router;
