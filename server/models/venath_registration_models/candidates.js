const mongoose = require("mongoose");
// const photoSchema = new mongoose.Schema({
//     data: Buffer,
//     contentType: String
//   });

const candidateSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required:true 
    },
    gender:{
        type: String,
        required: true
    },
    event:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    un:{
        type: String,
        required: true
        
    }
    ,
    photo: {
        data: {
            type: Buffer,
            default: Buffer.from('default_photo_data_in_base64_or_binary', 'base64') // Set default photo data as Buffer
        },
        contentType: {
            type: String,
            default: 'user/jpeg' // Default content type (replace with appropriate type)
        }
    }
});

//const Student = mongoose.model("Student",studentSchema)

 module.exports=mongoose.model("Candidate",candidateSchema);
// const Photo = mongoose.model('Photo', photoSchema);
// const Candidate = mongoose.model('Candidate', candidateSchema);

// module.exports = { Photo,Candidate };