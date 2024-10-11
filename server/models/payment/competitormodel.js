const mongoose = require('mongoose');

const { Schema } = mongoose;

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18 // Assuming candidates must be at least 18 years old
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'] // Enumerate possible genders
    },
    email: {
        type: String,
        required: true,
        unique: true, // Assuming each candidate has a unique email address
        lowercase: true, // Convert email to lowercase to ensure consistency
        trim: true // Remove leading/trailing whitespace from email
    },
    contact_number: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Regular expression to match a phone number with optional country code
                return /^\+?[0-9]+$/g.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    comp_type: {
        type: String,
        required: true
        // Assuming you might want to define enum values for competition types
    },
    image: {
        type: String,
        required: true
    }
});

const payment = mongoose.model('payment', candidateSchema);

module.exports = payment;
