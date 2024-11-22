const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SizeChart = sequelize.define("SizeChart", {
  chartName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionAbove: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  descriptionBelow: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  sizeData: {
    type: DataTypes.TEXT, // Store as JSON string
    allowNull: false,
  },
});

module.exports = SizeChart;
