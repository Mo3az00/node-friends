const mongoose = require('mongoose')

const userTechSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user'
  },
  title: {
    type: String,
    required: 'You must supply a title',
    trim: true
  },
  subtitle: {
    type: String,
    required: 'You must supply a subtitle',
    trim: true
  },
  icon: {
    type: String,
    required: 'You must supply a font-awesome icon',
    trim: true
  },
  description: {
    type: String,
    required: 'You must supply a description',
    trim: true
  },
  order: {
    type: Number,
    required: 'Please provide a number'
  }
}) 

module.exports = mongoose.model('UserTech', userTechSchema)