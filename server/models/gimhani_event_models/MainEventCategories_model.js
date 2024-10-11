const mongoose = require('mongoose');

const mainEventCategoriesSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },

  judgesCount: {
    type: Number,
    required: true,
  },

  rules: {
    type: String, 
    required: true,
  },
  
  registrationOpen: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('mainEventCategories', mainEventCategoriesSchema);
