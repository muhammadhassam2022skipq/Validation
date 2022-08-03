const express = require ("express");
const adminController = require("../controller/adminController");
const router = express.Router();
router.get ("/admin", adminController.getAdmin);
router.post ("/admin", adminController.postAdminCredential);
module.exports= router; 