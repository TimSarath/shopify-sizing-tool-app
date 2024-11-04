require("dotenv").config();
const axios = require("axios");

(async () => {
  const shop = process.env.SHOPIFY_SHOP_DOMAIN;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  const appUrl = process.env.SHOPIFY_APP_URL; // The ngrok URL or your app's URL

  if (!shop || !accessToken || !appUrl) {
    console.error(
      "Missing required environment variables. Please check SHOPIFY_SHOP_DOMAIN, SHOPIFY_ACCESS_TOKEN, and SHOPIFY_APP_URL in your .env file."
    );
    return;
  }

  const webhookUrl = `https://${shop}/admin/api/2023-04/webhooks.json`;

  try {
    const response = await axios.post(
      webhookUrl,
      {
        webhook: {
          topic: "products/update",
          address: `${appUrl}/webhooks/product-update`, // Ensure ngrok URL is used here
          format: "json",
        },
      },
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Webhook created successfully:", response.data);
  } catch (error) {
    console.error(
      "Error creating webhook:",
      error.response?.data || error.message
    );
  }
})();
