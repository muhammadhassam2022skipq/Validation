const mongoose = require("mongoose");
const signUPModel = require("../model/signUPModel");
mongoose.connect('mongodb://cmdlhrltx03/hassamDB');

const hash = await bcrypt.hash(hello, 10);
const signUP = new signUPModel({
    _id: mongoose.Types.ObjectId(),
    firstName: "Muhammad",
    lastName: "Hassam",
    email:"admin124@gmail.com",
    password: hash,
    userType: "Admin"
});
signUP.save();