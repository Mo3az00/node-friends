const mongoose = require('mongoose')
const User = mongoose.model('User')
const UserProfile = mongoose.model('UserProfile')
const HomepageTech = mongoose.model('HomepageTech')
const moment = require('moment')

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

// Frontend Page 
exports.frontendPage = async (request, response) => {
  // Calculating days learned and days left
  const now = moment()
  const courseStart = moment([2017, 9, 4])
  const courseEnd = moment([2018, 8, 16])
  const daysLearned = now.diff(courseStart, 'days')
  const daysLeft = courseEnd.diff(now, 'days')

  // Loading data
  const technologies = await HomepageTech.find().sort({ 'order': 1 })
  const students = await UserProfile.find().populate('user').sort({ 'first_name': 1 })

  response.render('home', {
    title: 'We build your next big thing',
    daysLearned,
    daysLeft,
    technologies,
    students
  })
}

// Student profile page
exports.studentProfile = async (request, response) => {

  response.render('studentProfile', {
    title: 'Student profile',
  })
}