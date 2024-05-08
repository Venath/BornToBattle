const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gallerySchema = new Schema({

    name:{
        type : String,
        require:true,
        maxlength: [20, 'First name cannot exceed 20 characters']
    },
    description:{
        type : String,
        require:true,
        maxlength: [50, 'First name cannot exceed 20 characters']
    },
    image:{
        type : String,
        require:true
    }


});

const media = mongoose.model("gallery",gallerySchema);

module.exports = media;
