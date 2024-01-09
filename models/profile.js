const mongoose = require('mongoose');
const Schema = mongoose.Schema

const profileSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  mbti: {
    type: String
  },
  enneagram: {
    type: String
  },
  variant: {
    type: String
  },
  tritype: {
    type: Number
  },
  socionics: {
    type: String
  },
  sloan: {
    type: String
  },
  psyche: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;