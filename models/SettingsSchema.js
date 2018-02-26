const mongoose = require('mongoose')

const SettingsSchema = new mongoose.Schema({
  Tech_Limit: {
    type: Number
	}
})

module.exports = mongoose.model('SettingsSchema', SettingsSchema)