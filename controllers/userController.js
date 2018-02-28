const mongoose = require('mongoose')
const User = mongoose.model('User')

// Dashboard
exports.dashboard = (request, response) => {
  if (!request.user) {
    return response.redirect('/admin/login')
  }

  response.render('admin/dashboard', {
    title: 'Admin'
  })
}


// Profile
exports.editProfile = (request, response) => {
  response.render('admin/users/edit-profile', {
    title: 'Edit your profile'
  })
}

// Students
exports.studentList = (request, response) => {
  response.render('admin/students', {
    title: 'Student List'
  })
}