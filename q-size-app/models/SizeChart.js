const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SizeChart = sequelize.define(
  "SizeChart",
  {
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bust: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    waist: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    hip: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "size_charts",
    timestamps: true,
  }
);

module.exports = SizeChart;
