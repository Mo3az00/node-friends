const mongoose = require('mongoose')
const User = mongoose.model('User')

// Login
exports.login = (request, response) => {
  response.render('user/login', { title: 'Login' })
}

// PROFILE
// display profile

exports.profile = (request, response) => {
  response.send('display profile here')
}

// edit profile
exports.editProfile = (request, response) => {
  response.render('user/edit-profile', {
    title: 'Edit your profile'
  })
}

//display profile
exports.updateProfile = (request, response) => {
  response.send('update profile here')
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

// Dashboard

exports.dashboard = (request, response) => {
  response.send('dashboard here')
}
