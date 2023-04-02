const Purchase = require("../model/PurchaseSchema");
const Product = require("../model/ProductSchema");

const addPurchase = async (req, res) => {
  const { product_id, stock, total_purchase_amount } = req.body;

  if (!product_id || !stock || !total_purchase_amount) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    const newPurchase = await new Purchase({
      product_id: product_id.value,
      stock,
      total_purchase_amount,
    });

    const purchaseAdd = await newPurchase.save();
    if (purchaseAdd) {
      const product = await Product.findOneAndUpdate(
        { _id: product_id.value },
        { $inc: { stock: stock } },
        { new: true }
      );
      res.status(201).json({ purchase: purchaseAdd, product: product });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("product_id");
    res.status(200).json(purchases);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// const getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findOne({ _id: id });
//     console.log(product);
//     res.status(200).json(product);
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    console.log(product);
    if (!product) {
      return res.json({ message: `Product with userId ${id} not found` });
    }
    const deleted = await Product.findByIdAndDelete(product._id);
    if (deleted) {
      res.json({ message: `Product ${deleted} has been deleted Sucessfully` });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, stock, manufacturer } = req.body;

  // if (!name || !stock || !manufacturer) {
  //   return res.status(422).json({ error: "Please fill all fields" });
  // }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, stock, manufacturer },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPurchase,
  getPurchases,
};
