const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
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
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;