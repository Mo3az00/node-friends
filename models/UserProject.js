const mongoose = require('mongoose')

const userProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user'
  },
  title: {
    type: String,
    trim: true,
    required: 'You must supply a title'
  },
  image: {
    type: String,
    required: 'Please upload an image',
    trim: true
  },
  link:{
    type: String,
    required: 'Please enter a link',
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: 'You must supply a description',
  },
  order: {
    type: Number,
  }
})

module.exports = mongoose.model('UserProject', userProjectSchema)