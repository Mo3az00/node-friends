const mongoose = require('mongoose')

const userTechSchema = new mongoose.Schema({
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
  subtitle: {
    type: String,
    trim: true,
    required: 'You must supply a subtitle'
  },
  icon: {
    type: String,
    trim: true,
    required: 'You must supply a font-awesome icon'
  },
  description: {
    type: String,
    trim: true,
    required: 'You must supply a description',
  },
  order: {
    type: Number,
    required: 'Please provide a number'
  }
})

module.exports = mongoose.model('UserTech', userTechSchema)