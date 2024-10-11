//because we connect with mongoDB
const { constrainPoint } = require('@fullcalendar/core/internal');
const mongoose = require('mongoose');
const yup = require('yup');

//create the schema variable
const schema = mongoose.Schema;

// Define a Yup schema for validation
const StallerSchemaValidation = yup.object().shape({
    sbn: yup.string().matches(/^SLR\d{4}$/, 'sbn should start with SLR'),
    companyName: yup.string().min(5).max(20).required(),
    firstName: yup.string().min(5).max(20).required(),
    lastName: yup.string().min(5).max(20).required(),
    mobile: yup.string().matches(/^7\d{8}$/, "Mobile number must start with '07'").required(),
    address: yup.string().min(10).max(50).required(),
    city: yup.string().min(5).max(20).required(),
    province: yup.string().min(3).max(20).required(),
    postalCode: yup.number().integer().required(),
    email: yup.string().email().required(),
});

//create the schema object 
const stallerSchema = new schema({
    sbn: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

})

// Add a pre-save hook to validate the data before saving it to the database
stallerSchema.pre('save', async function (next) {
    try {
        await StallerSchemaValidation.validate(this.toObject());
        next();
    } catch (error) {
        next(error);
        console.log(error)
    }
});

//pass the created schema to the mongoDB
//                           <document name>
const staller = mongoose.model("stallHolder", stallerSchema);

//export the schema( MUST DO)
module.exports = staller;
