const mongoose = require("mongoose");
const photoSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
  });

const audienceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    age:{
        type: Number,
        required:false 
    },
    gender:{
        type: String,
        required: false
    },
    phoneNumber:{
        type: Number,
        required: false
    },
    username:{
        type: String,
        required: true
        
    }
    // photo: {
    //     data: Buffer,
    //     contentType: String
    // }
    
});

const Audience = mongoose.model("audience",audienceSchema);

module.exports = Audience;

