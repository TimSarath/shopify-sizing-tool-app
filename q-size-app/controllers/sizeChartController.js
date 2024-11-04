const SizeChart = require("../models/SizeChart");

// Create a new size chart entry
exports.createSizeChart = async (req, res) => {
  try {
    const { productId, size, bust, waist, hip } = req.body;
    const sizeChart = await SizeChart.create({
      productId,
      size,
      bust,
      waist,
      hip,
    });
    res.status(201).json(sizeChart);
  } catch (err) {
    res.status(500).json({ error: "Failed to create size chart" });
  }
};

// Get size chart by product ID
exports.getSizeChartByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const sizeCharts = await SizeChart.findAll({ where: { productId } });
    if (sizeCharts.length > 0) {
      res.status(200).json(sizeCharts);
    } else {
      res.status(404).json({ message: "No size chart found for this product" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch size chart" });
  }
};
