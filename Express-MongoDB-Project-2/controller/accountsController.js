const express = require("express");
const mongoose = require("mongoose");
const signUPModel = require("../model/signUPModel");
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator/check');
// sign up

exports.getSignUP = ((req, res) => {
    // let isAdmin = false;
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    res.render("signup", {
        pageTitle: "Sign Up",
        isAuthenticated: isAuthenticated,
        Admin: Admin,
        validationErrors: []
    })
})

exports.postSignUP = ((req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const signUP = new signUPModel({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            userType: req.body.userType
        })
        signUP.save().then((signedUPUer) => {
            console.log("successfuly saved" + signedUPUer);
            res.redirect("/signin");

        });
    }).catch((err) => {
        console.log("The hash error is: " + err);
    });
    } else {
        res.render('signup', {
            path:'/signup',
            pageTitle: 'My New Store',
            validationErrors: errors.array(),
            isAuthenticated: isAuthenticated
        })
    }
})



//sign in
exports.getSignIn = ((req, res) => {
    // let isAdmin= false;
    // const userType = req.body.userType ? userType : "";
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    res.render("signin", {
        pageTitle: "Sign In",
        isAuthenticated: isAuthenticated,
        Admin: Admin
    })
})


exports.postSignIn = ((req, res) => {
    signUPModel.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) {
            console.log("The err " + err)
        } else if (foundUser) {
            req.session.isLoggedIn = true,
                bcrypt.compare(req.body.password, foundUser.password, ((err, result) => {
                    if (result === true) {
                        if(foundUser._id == "62eb970657cb4b3cefc26969"){
                            req.session.isAdminLoggedIn = true
                        }
                        res.redirect("/");
                    }
                    else {
                        res.redirect("/signin");
                    }

                }))
        } else {
            res.redirect("/signin");
        }

    })
})


//sign out 

exports.getSignOut = ((req, res) => {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    req.session.destroy()
    //    let  isAdmin = false
    // res.render('home', {
    //     pageTitle: "Sign Out",
    //     isAuthenticated: isAuthenticated,
    //     userType:  userType
    // })
    res.redirect("/")
})
