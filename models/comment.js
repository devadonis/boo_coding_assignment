const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  mbti: {
    type: String
  },
  enneagram: {
    type: String
  },
  zodiac: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  ],
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;