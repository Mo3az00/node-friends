const mongoose = require('mongoose')
const User = mongoose.model('User')
const moment = require('moment')

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
exports.studentList = async (request, response) => {

  const students = await User.find({ role: 'student' }).sort({ first_name: 1 })

  // response.json(students)

  response.render('admin/students', {
    title: 'Student List',
    students
  })
}

//Frontend Page 
exports.frontendPage = async (request, response) => {
  
  const now = moment()
  const courseEnd = moment([2018, 8, 16])
  const daysLeft = courseEnd.diff(now, 'days')

  const courseStart = moment([2017, 9, 4])
  const daysLearned = now.diff(courseStart, 'days')

  response.render('layout', {
    title: 'Main',
    daysLearned,
    daysLeft
  })
}

//studentuserprofile
exports.studentProfile = async (request, response) => {
  
  response.render('studentProfile', {
    title: 'Student profile',
  })
}
