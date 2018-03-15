const mongoose = require('mongoose')
const User = mongoose.model('User')
const HomepageTech = mongoose.model('HomepageTech')
const UserProject = mongoose.model('UserProject')
const UserTechFavorite = mongoose.model('UserTechFavorite')
const moment = require('moment')
const mail = require('../handlers/mail')

// Home Page

exports.home = async (request, response) => {
  // Calculating days learned and days left
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
    title: 'Junior Web Developers in Berlin',
    description: 'Node friends is a team project by DCI\'s 5th web development course in Berlin. We used modern frontend and backend technologies such as Bootstrap, JavaScript, Node.js, Express and MongoDB to build a website and a members area. We\'re available for hire!',
    daysLearned,
    daysLeft,
    technologies,
    students,
    teachers
  })
}

// Single student profile
exports.studentProfile = async (request, response) => {
  const student = await User.findOne({ slug: request.params.slug })
  const projects = await UserProject.find({ user: student._id })
  const technologies = await UserTechFavorite.find({ user: student._id })

  response.render('studentProfile', {
    title: `${student.first_name} ${student.last_name}`,
    description: `Hello, I'm ${student.first_name}, a ${student.role} at the Digital Career Institute in Berlin. I'm available for hire, if you're looking for a motivated Junior Web Developer.`,
    bodyClass: 'scrolled profile',
    student,
    projects,
    technologies
  })
}

exports.sendContactForm = async (request, response) => {
  try {
    const dateNow = moment().format('YYYY-MM-DD HH:mm')

    await mail.send({
      filename: 'contact-form',
      subject: `Contact Form - ${dateNow}`,
      to: [
        'info@node-friends.com'
      ],
      name: request.body.name,
      email: request.body.email,
      message: request.body.message
    });
  } catch (error) {
    return response.json({
      code: 500,
      error: error.message,
      message: 'Something went wrong sending the email. Please try again later.'
    })
  }

  return response.json({
    code: 200,
    message: 'OK'
  })
}