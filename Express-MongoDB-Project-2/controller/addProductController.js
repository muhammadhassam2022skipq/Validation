exports.getProduct=((req,res)=> {
    const userType= req.body.userType ? userType : "";
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    res.render("addProduct", {
        pageTitle: "Add Products",
        isAuthenticated : isAuthenticated,
        Admin: Admin

    })
});