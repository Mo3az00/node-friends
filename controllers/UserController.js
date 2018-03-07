const mongoose = require('mongoose')
const User = mongoose.model('User')

// Dashboard
exports.dashboard = async (request, response) => {

  if (!request.user) {
    return response.redirect('/admin/login')
  }

  const students = await User.find({ role: 'student' }).sort({ first_name: 1 })

  response.render('admin/dashboard', {
    title: 'Dashboard',
    students
  })
}

// List of students
exports.studentList = async (request, response) => {
  const students = await User.find({ role: 'student' }).sort({ first_name: 1 })

  response.render('admin/students', {
    title: 'Students',
    students
  })
}
