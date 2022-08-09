const express = require("express");
const accountsController = require("../controller/accountsController");
const { check } = require("express-validator");
const signUPModel = require("../model/signUPModel");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/signup", accountsController.getSignUP);
router.post(
  "/signup",
  check("firstName")
    .isLength({ min: 5 })
    .withMessage("The first Name cannot be empty"),
  check("lastName")
    .isLength({ min: 5 })
    .withMessage("The last Name cannot be empty"),
  check("email")
    .custom((value) => {
      return signUPModel.findOne({ email: value }).then((user) => {
        if (user) {
          throw new Error("E-mail already in use");
        }
      });
    })
    .isEmail()
    .withMessage("Not an email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("must be at least 8 chars long")
    .matches("[0-9]")
    .withMessage("Password must contain a number")
    .matches("[A-Z]")
    .withMessage("Password must contain a uppercase letter"),
  accountsController.postSignUP
);
router.get("/signin", accountsController.getSignIn);
router.post(
  "/signin",
  check("email")
    .custom((value) => {
      return signUPModel.findOne({ email: value }).then((user) => {
        if (!user) {
          throw new Error(
            "User Does not exist, plase first create an account by Signing Up"
          );
        } else {
          return true;
        }
      });
    })
    .isEmail()
    .withMessage("Not a valid email")
    // check("password")
    // .custom((value, {req}) => {
    //    return signUPModel.find({email: req.body.email}).then (foundUser => {
    //     console.log(foundUser)
    //     bcrypt.compare(req.body.password, foundUser.password)
    //     .then (x => {
    //         if (!x) {
    //             throw new Error ('Wrong Password')
    //         }
    //     })
    //    })

    // })
    ,
  accountsController.postSignIn
);

router.get("/signout", accountsController.getSignOut);
module.exports = router;
