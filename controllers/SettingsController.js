const mongoose = require('mongoose')
const Settings = mongoose.model('Settings')

// Display settings
exports.form = (request, response) => {
  response.render('user/settings', { title: 'Edit settings' })
}

// Profile
exports.updateSettings = (request, response) => {
  response.send("coming soon")
}

