const express = require("express");
const router = express.Router();
const sales = require("../controller/sales");

router.post("/", sales.addSale);
router.get("/", sales.getSales);
// router.get("/:id", products.getProductById);
// router.delete("/:id", products.deleteProducts);
// router.patch("/:id", products.updateProducts);

module.exports = router;
