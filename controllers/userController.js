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

exports.absenceReport = async (request, response) => {
    response.render('/absenceReport', {
        title: 'add absence report'
    })
response.json('it works')


// Dashboard
exports.dashboard = (request, response) => {
// Admin
exports.admin = (request, response) => {
  response.render('admin/layout', {
    title: 'Admin'
  })
}

// Students
exports.studentList = (request, response) => {
  response.render('admin/students', {
    title: 'Student List'
  })
}