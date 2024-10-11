const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  
  category: {
    type: String,
    required: true,
  },

  topic: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  gender: {
    type: String, 
    enum: ['male', 'female','open'],
  },

  ageGroup: {
    type: String,
    // Assuming you want to restrict ageGroup to certain values (under18 or above18)
    enum: ['under16', 'under18', 'above18','open'],//If a value other than 'under18' or 'above18' is attempted to be assigned to ageGroup, it will result in a validation error.
  },

  time: {
    type: String,
    required: true,
  },

  // eventCategory: {
  //   type: String,
  //   // Assuming you want to restrict eventCategory to certain values
  //   enum: ['dancing', 'rap', 'beatboxing'],
  // },
  // style: {
  //   type: String,
  //   // Assuming you want to restrict style to certain values
  //   enum: ['traditional', 'hiphop', 'na'],
  // },
});

module.exports = mongoose.model('Events', eventSchema);
