const SizeChart = require("../models/SizeChart");

// Create a new size chart entry
exports.createSizeChart = async (data) => {
  const { chartName, descriptionAbove, descriptionBelow, sizeChart } = data;
  try {
    // Save the size chart as a single entity with sizeChart data serialized
    const newSizeChart = await SizeChart.create({
      chartName,
      descriptionAbove,
      descriptionBelow,
      sizeData: JSON.stringify(sizeChart), // Save the chart data as JSON
    });
    return newSizeChart;
  } catch (err) {
    console.error("Error creating size chart:", err);
    throw new Error("Failed to create size chart entry");
  }
};

// Get a size chart by ID
exports.getSizeChartById = async (chartId) => {
  try {
    const sizeChart = await SizeChart.findByPk(chartId);
    if (sizeChart) {
      return {
        ...sizeChart.toJSON(),
        sizeData: JSON.parse(sizeChart.sizeData), // Parse size data back to object
      };
    }
    return null;
  } catch (err) {
    console.error("Error fetching size chart:", err);
    throw new Error("Failed to fetch size chart");
  }
};

// Get all size charts
exports.getAllSizeCharts = async () => {
  try {
    const sizeCharts = await SizeChart.findAll();
    return sizeCharts.map((chart) => ({
      ...chart.toJSON(),
      sizeData: JSON.parse(chart.sizeData),
    }));
  } catch (err) {
    console.error("Error fetching all size charts:", err);
    throw new Error("Failed to fetch size charts");
  }
};

// Associate products with a size chart
exports.associateProducts = async (chartId, productIds) => {
  try {
    // Assuming there's a ChartProduct model for many-to-many relationships
    const associations = productIds.map((productId) => ({
      chartId,
      productId,
    }));
    await ChartProduct.bulkCreate(associations, { ignoreDuplicates: true });
  } catch (err) {
    console.error("Error associating products:", err);
    throw new Error("Failed to associate products with size chart");
  }
};
