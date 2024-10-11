const mongoose = require("mongoose");

const mediaManager_SignUp_Signin = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("media_signUp", mediaManager_SignUp_Signin);

//model for both signin and signup