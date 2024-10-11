const mongoose = require("mongoose");

const stall_SignUp_Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("stall_signUp", stall_SignUp_Schema);

//model for both sign in and the sign up