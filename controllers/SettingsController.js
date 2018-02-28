const mongoose = require('mongoose')
const Settings = mongoose.model('Settings')

// Display settings
exports.form = async (request, response) => {
  response.render('user/settings', { title: 'Edit settings' })
}

// Profile
exports.updateSettings = async (request, response) => {
  response.send("coming soon")
}

