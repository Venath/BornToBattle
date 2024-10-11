const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
  
  text: {
    type: String,
    required: true,
  },

  topic: {
    type: String,
    required: true,
  },

  topicId: {
    type: String,
    required: true,
  },

  

});

module.exports = mongoose.model('Notifications', notificationsSchema);