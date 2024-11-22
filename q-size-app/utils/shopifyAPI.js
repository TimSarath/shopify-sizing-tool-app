// utils/shopifyAPI.js
const axios = require("axios");
require("dotenv").config();

// Function to get product data
async function getProductData(productId) {
  try {
    const response = await axios.get(
      `https://${process.env.SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/products/${productId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
        },
      }
    );
    console.log("Product data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product data:",
      error.response?.data || error
    );
  }
}

module.exports = { getProductData };
