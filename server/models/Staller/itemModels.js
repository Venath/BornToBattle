//because we connect with mongoDB
const mongoose = require('mongoose');
const yup = require('yup');

//create the schema variable
const schema = mongoose.Schema;

// Define a Yup schema for validation
const ItemSchemaValidation = yup.object().shape({
    pName: yup.string().min(5).max(20).required(),
    pPrice: yup.number().positive().lessThan(5000).required(), 
    pImage: yup.string().required(),
});

//create the schema object
const itemSchema = new schema({
    pName : {
        type : String,
        required : true,
    },
    pPrice : {
        type : Number,
        required : true,
    },
    pImage: {
        type : String,
        required : true,
    },
    
})

// Add a pre-save hook to validate the data before saving it to the database
itemSchema.pre('save', async function(next) {
    try {
        await ItemSchemaValidation.validate(this.toObject());
        next();
    } catch (error) {
        next(error);
    }
});


//pass the created schema to the mongoDB
//                           <document name>
const item = mongoose.model("stallItem", itemSchema);

//export the schema( MUST DO)
module.exports = item;
