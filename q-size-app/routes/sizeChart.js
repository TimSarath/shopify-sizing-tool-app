const express = require("express");
const router = express.Router();
const sizeChartController = require("../controllers/sizeChartController");

// Create a new size chart
router.post("/", async (req, res) => {
  try {
    const sizeChart = await sizeChartController.createSizeChart(req.body);
    res.status(201).json({
      message: "Size chart created successfully",
      chartId: sizeChart.id,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create size chart" });
  }
});

// Get all size charts
router.get("/", async (req, res) => {
  try {
    const sizeCharts = await sizeChartController.getAllSizeCharts();
    res.status(200).json(sizeCharts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch size charts" });
  }
});

// Associate products with a size chart
router.post("/associate-products", async (req, res) => {
  try {
    const { chartId, productIds } = req.body;
    await sizeChartController.associateProducts(chartId, productIds);
    res.status(200).json({ message: "Products associated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to associate products" });
  }
});

module.exports = router;
