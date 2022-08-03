const express = require ("express");
const updateProduct = require("../controller/updateProductController");
const router = express.Router();


router.get ("/listproducts/update", updateProduct.getUpdate);
router.post ("/listproducts/update", updateProduct.postUpdate);

module.exports= router;