const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestFormSchema = new Schema({
    fname: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [3, 'First name must be at least 2 characters long'],
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lname: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [3, 'Last name must be at least 2 characters long'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    address1: {
        type: String,
        required: [true, 'Address line 1 is required'],
        trim: true,
        maxlength: [100, 'Address line 1 cannot exceed 100 characters']
    },
    address2: {
        type: String,
        trim: true,
        maxlength: [100, 'Address line 2 cannot exceed 100 characters']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        maxlength: [10, 'City name cannot exceed 50 characters']
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
        maxlength: [10, 'City name cannot exceed 50 characters']
    },
    zip: {
        type: String, 
        required: [true, 'Zip code is required'],
        trim: true,
        match: [/^\d{4,6}(-\d{4})?$/        , 'Please enter a valid zip code']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    }
});

const requestForm = mongoose.model("RequestForm", requestFormSchema);

module.exports = requestForm;
