const mongoose = require('mongoose')

const SettingsSchema = new mongoose.Schema({
  tech_limit: {
    type: Number
	}
})

module.exports = mongoose.model('Settings', Settings)