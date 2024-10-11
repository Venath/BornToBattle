const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  members: [
    {
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      },
      gender: {
        type: String,
        required: true
      }
    }
  ],
  photo: {
    data: {
        type: Buffer,
        default: Buffer.from('default_photo_data_in_base64_or_binary', 'base64') // Set default photo data as Buffer
    },
    contentType: {
        type: String,
        default: 'user/jpeg' // Default content type (replace with appropriate type)
    }
}
});

// Create and export the Group model
const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
