const mongoose = require("mongoose");

const sponsor_SignUp = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("sponsor_SignUp", sponsor_SignUp);

//model for both sign in and the sign up
