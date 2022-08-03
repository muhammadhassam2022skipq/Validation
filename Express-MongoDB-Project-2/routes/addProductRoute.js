const express = require ("express");
const addProductController = require("../controller/addProductController");
const router = express.Router();


router.get ("/addproducts", addProductController.getProduct)

module.exports= router;