
exports.getProduct=((req,res)=> {
    const Admin = req.session.isAdminLoggedIn ? req.session.isAdminLoggedIn : false;
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render("home", {  
        pageTitle: "Home Page",
        isAuthenticated: isAuthenticated,
        Admin : Admin
    })
 })
