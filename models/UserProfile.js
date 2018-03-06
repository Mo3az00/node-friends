const mongoose = require('mongoose')
const validator = require('validator');

const userProfile = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user!'
  },
  avatar: String,
  photo: String,
  bio: {
    type: String,
    trim: true
  },
  webpage: {
    type: String,
    trim: true,
    validate: [validator.isURL, 'Please supply a valid URL for your website!'],
  }
})

module.exports = mongoose.model('UserProfile', userProfile)