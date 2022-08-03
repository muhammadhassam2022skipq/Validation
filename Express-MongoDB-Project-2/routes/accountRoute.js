const express = require ("express");
const { check } = require('express-validator');
const accountsController = require("../controller/accountsController");
const router = express.Router();


router.get ("/signup", accountsController.getSignUP);
router.post ("/signup",
check('email')
.isEmail()
.withMessage('Not an email'),
check('password')
.isLength({ min: 5 })
.withMessage('must be at least 5 chars long')
.matches(/\d/)
.withMessage('must contain a number'), 
accountsController.postSignUP);
router.get ("/signin", accountsController.getSignIn);
router.post ("/signin", accountsController.postSignIn);
router.get('/signout',accountsController.getSignOut);
module.exports= router;