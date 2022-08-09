const express = require ("express");
const forgetPasswordController = require("../controller/forgetPasswordController");
const { check } = require('express-validator');
const signUPModel = require("../model/signUPModel");

const router = express.Router();

router.get("/forgetpassword",forgetPasswordController.getForgetPassword);
router.post("/forgetpassword",
check('email').custom(value => {
return signUPModel.findOne({email:value}).then( user=> {
if (!user) {
    throw new Error('User Does not exist, plase first create an account by Signing Up')
}
else {
    return true;
}
})
})
.isEmail()
.withMessage('Not an email'),
check('password')
.isLength({ min: 8 })
.withMessage('must be at least 8 chars long')
.matches('[0-9]')
.withMessage('Password must contain a number')
.matches('[A-Z]')
.withMessage('Password must contain a uppercase letter'),
check('confirmPassword').custom( (value, {req} )=> {
if (value != req.body.password ) {
 throw new Error ("Password does not match")
}
else {
    return true;
}
}),
forgetPasswordController.postForgetPassword);

module.exports= router;