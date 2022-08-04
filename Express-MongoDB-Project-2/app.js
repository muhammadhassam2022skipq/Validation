// importing all the neccasery modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); // Express app initializing
const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const homeRoute = require("./routes/homeRoute");
const bcrypt = require("bcrypt");
const addProductRoute = require("./routes/addProductRoute");
const listProductRoute = require("./routes/listProductRoute");
const updateProductRoute = require("./routes/upadateRoute");
const deleteProductRoute = require("./routes/deleteRoute");
const accountRoute = require("./routes/accountRoute");
const adminRoute = require("./routes/adminRoute");
const forgetPasswordRoute = require("./routes/forgetPasswordRoute");
const signUPModel = require("./model/signUPModel");


const store = new MongoDBStore({
  uri: 'mongodb://cmdlhrltx03:27017/store-sessions',
  collection: 'sessions'
});

// To
app.use(bodyParser.urlencoded({ extended: false }));

//Template engine ejs in views 
app.set("views", "views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

//giving the location of static files
app.use(express.static(__dirname + "/public"));

signUPModel.findById({ _id: "62eb970657cb4b3cefc26969" }).then(admin => {
  if (!admin) {
    bcrypt.hash("hello", 10).then(hash => {
      const signUP = new signUPModel({
        _id: mongoose.Types.ObjectId(),
        firstName: "Muhammad",
        lastName: "Hassam",
        email: "admin124@gmail.com",
        password: hash,
        userType: "Admin"
      });
      signUP.save();
    });
  }
  else {
    console.log("The admin is in data base")
  }
})


// loading error page


//routing of all the pages
app.use(homeRoute);
app.use(addProductRoute);
app.use(listProductRoute);
app.use(updateProductRoute);
app.use(deleteProductRoute);
app.use(accountRoute);
app.use(forgetPasswordRoute);
app.use(adminRoute);



app.use((req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
  res.render("error", {
    pageTitle: "Error Page Not Found",
    isAuthenticated: isAuthenticated
  })
});


//mongodb://cmdlhrltx03:27017/hassamDB
// Connecting with mongoDB server and then Listening to the port
mongoose.connect('mongodb://cmdlhrltx03/hassamDB').then((req, res) => {

  app.listen(4000, () => {
    signUPModel.findOne({ _id: "62eb970657cb4b3cefc26969" }).then(() => {
      console.log("connected to the port 4000");
    }).catch(err => {
      console.log("Failed to connect to the server as admin does not exists");
    })
  })
})
