const bcrypt = require("bcrypt");
const signUPModel = require("../model/signUPModel");
const mongoose = require("mongoose");
const {validationResult} = require('express-validator/check');


exports.getForgetPassword = (req, res) => {
  const isAuthenticated = req.session.isLoggedIn
    ? req.session.isLoggedIn
    : false;
  const Admin = req.session.isAdminLoggedIn
    ? req.session.isAdminLoggedIn
    : false;
  res.render("forgetPassword", {
    pageTitle: "Forget Password Page",
    isAuthenticated: isAuthenticated,
    Admin: Admin,
    validationErrors: [],
  });
};

exports.postForgetPassword = (req, res) => {
  const errors = validationResult(req);
  const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
  const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
  if(errors.isEmpty()) {
  signUPModel.findOne({ email: req.body.email }).then((user) => {
    if (req.body.password === req.body.confirmPassword) {
      bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
        signUPModel
          .updateOne(
            {
              password: user.password,
            },
            {
              $set: { password: hashedPassword },
            }
          )
          .then((user) => {
            console.log("password changed successfully");
            res.redirect("/signin");
          });
      });
    }
    else {
        res.send ("Password Does Not Match")
        // throw new Error('Passwords must be same')
    }
  }) 
}else {
  res.render('forgetPassword', {
    path:'/forgetpassword',
    pageTitle: 'My New Store',
    validationErrors: errors.array(),
    isAuthenticated: isAuthenticated,
    Admin: Admin
})
};
};
