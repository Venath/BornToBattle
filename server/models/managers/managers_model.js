const mongoose=require('mongoose');

const managerSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    type:{
        type:String,
        required:true
    },

    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
});

module.exports=mongoose.model("Managers",managerSchema);