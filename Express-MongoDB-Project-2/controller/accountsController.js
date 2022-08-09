const express = require("express");
const mongoose = require("mongoose");
const signUPModel = require("../model/signUPModel");
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator/check');
// sign up

exports.getSignUP = ((req, res) => {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    res.render("signup", {
        pageTitle: "Sign Up",
        isAuthenticated: isAuthenticated,
        Admin: Admin,
        validationErrors: [],
    }
    )
})
exports.postSignUP = ((req, res) => {
    const errors = validationResult(req);
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    if(errors.isEmpty()) {
    bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
        const signUP = new signUPModel({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
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
            isAuthenticated: isAuthenticated,
            Admin: Admin
        })
    }
})



//sign in
exports.getSignIn = ((req, res) => {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    res.render("signin", {
        pageTitle: "Sign In",
        isAuthenticated: isAuthenticated,
        Admin: Admin,
        validationErrors: []
    })
})


exports.postSignIn = ((req, res) => {
    const errors = validationResult(req);
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    if(errors.isEmpty()) {
    signUPModel.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) {
            console.log("The err " + err)
        } else if (foundUser) {
            req.session.isLoggedIn = true,
                bcrypt.compare(req.body.password, foundUser.password, ((err, result) => {
                    if (result === true) {
                        if(foundUser.email == "admin124@gmail.com"){
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
}
else {
    res.render('signin', {
        path:'/signin',
        pageTitle: 'My New Store',
        validationErrors: errors.array(),
        isAuthenticated: isAuthenticated,
        Admin: Admin
    })
}
})


//sign out 

exports.getSignOut = ((req, res) => {
    req.session.destroy()
    res.redirect("/")
})
