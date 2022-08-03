const express = require ("express");
const listProductController = require("../controller/ListProductController");
const router = express.Router();


router.get ("/listproducts", listProductController.getProduct);
router.post("/listproducts", listProductController.postProduct)

module.exports= router;