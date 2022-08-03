exports.getAdmin = ((req, res) => {
    const userType= req.body.userType ? userType : "";
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    res.render("admin", {
        pageTitle: "Admin",
        isAuthenticated: isAuthenticated,
        Admin: Admin
    })
});

exports.postAdminCredential = ((req, res) => {
    const adminName = "hassam";
    const adminpassword = 123456;
    console.log("The name is: " + req.body.adminName);
    console.log("The password is: " + req.body.admimPassword)
    if (req.body.adminName == adminName && req.body.adminPassword == adminpassword) {
        res.redirect("/addproducts")
        return isAdmin = true;
    }
    else {
        res.redirect("/admin")
    }

})