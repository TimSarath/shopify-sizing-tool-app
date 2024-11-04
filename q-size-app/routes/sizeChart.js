const express = require("express");
const router = express.Router();
const {
  createSizeChart,
  getSizeChartByProduct,
} = require("../controllers/sizeChartController");

// Route for creating size data
router.post("/create", createSizeChart);

// Route for fetching size data by product
router.get("/product/:productId", getSizeChartByProduct);

module.exports = router;
