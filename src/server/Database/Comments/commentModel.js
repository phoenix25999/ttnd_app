const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String
      },
      buzzId: { // Post on which the comment is added on
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buzz'
      },
      image:{
        type: String
      },
      contentType: {
        type: String,
        enum: ['Comment', 'Reply']
      },
      createdOn:{
        type: Date,
        default: Date.now
      },
      parentComment: { // In case of Replies. ID of comment on which reply is at
        type: mongoose.Schema.Types.ObjectId
      },
      commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

const commentModel = mongoose.model('Comment', commentSchema);

module.exports = commentModel;