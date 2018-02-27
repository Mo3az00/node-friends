const mongoose = require('mongoose')
const User = mongoose.model('User')

// Login
exports.login = (request, response) => {
    response.render('user/login', { title: 'Login' })
}

// Profile
exports.editProfile = (request, response) => {
    response.render('user/edit-profile', {
        title: 'Edit your profile'
    })
}

exports.absenceReport = (request, response) => {
    response.render('admin/absenceReport', {
        title: 'add absence report'
    })
}

// Dashboard
exports.dashboard = (request, response) => {
  response.render('admin/layout', {
      title: 'Admin'
  })
}
