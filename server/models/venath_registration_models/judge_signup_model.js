const mongoose = require("mongoose");

const JloginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Judge_Login", JloginSchema);


