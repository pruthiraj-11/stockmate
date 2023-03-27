const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 20,
    },
    manufacturer: {
      type: String,
      required: true,
      max: 20,
    },
    description: {
      type: String,
      required: true,
      max: 50,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);

// Product.createIndexes();

module.exports = Product;
