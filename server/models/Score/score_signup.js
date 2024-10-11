const mongoose = require("mongoose");

const scoreManager_SignUp_Signin = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("score_signup", scoreManager_SignUp_Signin);

//model for both signin and signup
