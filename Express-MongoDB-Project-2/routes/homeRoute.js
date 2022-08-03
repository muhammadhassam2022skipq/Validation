const express = require ("express");
const homeController = require("../controller/homeController");
const router = express.Router();


router.get ("/", homeController.getProduct)

module.exports= router;