const express = require("express");
const router = express.Router();
stores = require("../controller/stores");

router.post("/", stores.addStore);
router.get("/", stores.getStores);
// router.get("/:id", products.getProductById);
// router.delete("/:id", products.deleteProducts);
// router.patch("/:id", products.updateProducts);

module.exports = router;
