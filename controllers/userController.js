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

// Student list

exports.studentList = (request, response) => {
  response.render('this is where the student list will go')
}

// Logout
exports.logout = (request, response) => {
  request.logout()
  request.flash('success', 'You are now logged out')
  response.redirect('/')
}
