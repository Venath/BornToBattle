const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    comments: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    candidate: {
      type: Schema.Types.ObjectId,
      ref: 'Candidate', // Reference to the Candidate model
      required: false
    },
    create: {
      type: Date,
      default: Date.now,
    },
    
  });
  
  const Comment = mongoose.model('comment', commentSchema);
  // collection named "comments" (pluralized form of "comment") where documents of this model will be stored in DB.


  module.exports = Comment;