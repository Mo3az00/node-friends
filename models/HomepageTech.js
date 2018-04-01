const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const homepageTechSchema = new mongoose.Schema({
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
    type: String
  },
  description: {
    type: String,
    trim: true,
    required: 'You must supply a description'
  },
  order: {
    type: Number,
    required: 'Please provide a number'
  }
})

module.exports = mongoose.model('HomepageTech', homepageTechSchema)
