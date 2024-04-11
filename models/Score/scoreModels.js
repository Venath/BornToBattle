const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({

    CId :{
        type : String,
        required : true,
    },
    JId :{
        type : String,
        required : true,
    },
    Performance :{
        type : Number,
        required : true,
    },
    Costume :{
        type : Number,
        required : true,
    },
    Technique:{
        type : Number,
        required : true,
    },
    Timing :{
        type : Number,
        required : true,
    },
    Feedback :{
        type : String,
        required : true,
    },
})

const score = mongoose.model("score",scoreSchema);

module.exports = score;
