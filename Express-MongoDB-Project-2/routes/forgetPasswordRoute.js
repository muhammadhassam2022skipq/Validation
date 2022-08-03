const express = require ("express");
const forgetPasswordController = require("../controller/forgetPasswordController");
const router = express.Router();

router.get("/forgetpassword",forgetPasswordController.getForgetPassword);
router.post("/forgetpassword",forgetPasswordController.postForgetPassword);

module.exports= router;