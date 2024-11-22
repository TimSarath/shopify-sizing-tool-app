const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const axios = require("axios");
const sequelize = require("./config/database");
const sizeChartRoutes = require("./routes/sizeChart"); // Ensure path is correct
const webhookRoutes = require("./routes/webhooks");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware for parsing JSON
app.use(express.json());

// CORS middleware to enable requests from the frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allows all origins - you may restrict this in production
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Intercept the OPTIONS method
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// Configure sessions for storing OAuth tokens securely
app.use(
  session({
    secret: process.env.SHOPIFY_API_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// OAuth Route: Initiate the OAuth process
app.get("/auth", (req, res) => {
  const shop = req.query.shop;

  // Check if the shop parameter is missing
  if (!shop) {
    return res.status(400).send("Shop parameter is missing");
  }

  const appUrl = process.env.SHOPIFY_APP_URL;
  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_API_SCOPES}&redirect_uri=${appUrl}/auth/callback`;

  res.redirect(authUrl);
});

// OAuth Callback Route
app.get("/auth/callback", async (req, res) => {
  const { code, shop } = req.query;

  // Log the incoming query parameters for debugging
  console.log("Callback Query Params:", req.query);

  // Check if shop or code is missing
  if (!shop || !code) {
    console.error("Shop or code parameter is missing");
    return res.status(400).send("Shop or code parameter is missing");
  }

  const accessTokenUrl = `https://${shop}/admin/oauth/access_token`;

  try {
    const response = await axios.post(accessTokenUrl, {
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    });

    const accessToken = response.data.access_token;
    req.session.accessToken = accessToken; // Store the access token
    req.session.shop = shop; // Store the shop domain

    console.log("OAuth successful:", { shop, accessToken });
    res.redirect("/"); // Redirect to your app's home page
  } catch (error) {
    console.error("OAuth error:", error.message);
    res.status(500).send("Authentication failed");
  }
});

// Basic home route
app.get("/", (req, res) => {
  res.send("Welcome to the Sizing Tool APP");
});

// Register size chart and webhook routes
app.use("/api/size-chart", sizeChartRoutes); // Make sure the route is correct
app.use("/webhooks", webhookRoutes);

// Test and sync database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    return sequelize.sync();
  })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => console.error("Error connecting to the database:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
