
const productModel = require("../model/addProductListModel");
const mongoose = require ("mongoose");
exports.get=((req,res)=> {
    // let isAdmin = false;
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render("delete", {
        pageTitle: "Delete Products",
        isAuthenticated: isAuthenticated,
        Admin : Admin
    })
});
exports.postDelete = ((req,res)=> {
    const deleteInDB = async ()=>{
        let data = await productModel.deleteOne({name: req.body.deletedProduct})
    }
    deleteInDB();
    res.redirect ("/listproducts");
})