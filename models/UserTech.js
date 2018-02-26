const mongoose = require('mongoose')

const userTechSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'UserModels'
  },
  tech_name: {
    type: String,
    required: 'You must supply a title'
  },
  tech_subtitle: {
    type: String,
    required: 'You must supply a subtitle'
  },
  tech_icon: {
    type: String,
    required: 'You must supply a font-awesome icon'
  },
  tech_name: {
    type: String,
    required: 'You must supply a description'
  },
  order: {
    type: Number,
    required: 'Please provide a number'
  }
}) 

module.exports = mongoose.model('UserTech', userTechSchema)