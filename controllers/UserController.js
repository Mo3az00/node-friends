const mongoose = require('mongoose')
const User = mongoose.model('User')

// Dashboard
exports.dashboard = async (request, response) => {
  response.render('admin/dashboard', {
    title: 'Dashboard',
    bodyClass: 'dashboard'
  })
}

// List of students
exports.studentList = async (request, response) => {
  const students = await User.find({ role: 'student' }).sort({ first_name: 1 })

  response.render('admin/students/studentList', {
    title: 'Students',
    students
  })
}
