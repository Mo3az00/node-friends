const mongoose = require('mongoose')
const User = mongoose.model('User')
const HomepageTech = mongoose.model('HomepageTech')
const UserProject = mongoose.model('UserProject')
const UserTechFavorite = mongoose.model('UserTechFavorite')
const moment = require('moment')

// Dashboard
exports.dashboard = async (request, response) => {

  if (!request.user) {
    return response.redirect('/admin/login')
  }

  const students = await User.find({ role: 'student' }).sort({ first_name: 1 })

  response.render('admin/dashboard', {
    title: 'Dashboard',
    bodyClass: 'dashboard',
    students
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

<<<<<<< HEAD
//Frontend Page
exports.frontendPage = async (request, response) => {

=======
// Frontend Page 
exports.frontendPage = async (request, response) => {
  // Calculating days learned and days left
>>>>>>> 0a750e4248e0771ec45ffd070a9d39e2e91f128e
  const now = moment()
  const courseStart = moment([2017, 9, 4])
  const courseEnd = moment([2018, 8, 16])
  const daysLearned = now.diff(courseStart, 'days')
  const daysLeft = courseEnd.diff(now, 'days')

  // Loading data
  const technologies = await HomepageTech.find().sort({ 'order': 1 })
  const students = await User.find({ role: 'student' }).sort({ 'first_name': 1 })
  const teachers = await User.find({ role: 'teacher' }).sort({ 'first_name': 1 })

  response.render('home', {
    title: 'We build your next big thing',
    daysLearned,
    daysLeft,
    technologies,
    students,
    teachers
  })
}

// Single student profile
exports.studentProfile = async (request, response) => {

  response.render('studentProfile', {
    title: `Profile: ${student.first_name} ${student.last_name}`,
    bodyClass: 'scrolled profile',
    student,
    projects,
    technologies
  })
}