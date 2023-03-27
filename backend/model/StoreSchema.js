const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 20,
    },
    address: {
      type: String,
      required: true,
      max: 50,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("stores", StoreSchema);

// Product.createIndexes();

module.exports = Store;
