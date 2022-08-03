const express = require ("express");
const deleteProductController = require("../controller/deleteProductController");
const router = express.Router();


router.get ("/listproducts/delete", deleteProductController.get)
router.post ("/listproducts/delete", deleteProductController.postDelete)

module.exports= router;