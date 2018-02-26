const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
  tech_limit: {
    type: Number
  }
})

module.exports = mongoose.model('Settings', settingsSchema)