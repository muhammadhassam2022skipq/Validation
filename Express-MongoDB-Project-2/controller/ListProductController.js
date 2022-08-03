let name;
let price;
const productModel = require("../model/addProductListModel");
const mongoose = require("mongoose");
exports.getProduct = ((req, res) => {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    if (isAuthenticated == true) {
        productModel.find().then(products => {
            res.render("listProduct", {
                pageTitle: "Product List",
                products: products,
                isAuthenticated: isAuthenticated,
                Admin: Admin
            })
        }).catch((err) => {
            console.log("The error is: " + err)
        })
    }
    else {
        res.redirect("signin")
    }

});

exports.postProduct = ((req, res) => {
    const product = new productModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: +req.body.price,
        category: req.body.category,
    });
    product.save().then(addedProduct => {
        res.redirect("/listproducts");
    });


})