const mongoose = require('mongoose')
const User = mongoose.model('User')
const HomepageTech = mongoose.model('HomepageTech')
const UserProject = mongoose.model('UserProject')
const UserTechFavorite = mongoose.model('UserTechFavorite')
const moment = require('moment')
const mail = require('../handlers/mail')
const { body, custom, validationResult } = require('express-validator/check');

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

exports.contactFormValidation = [
  body(['name', 'email', 'subject', 'message'], 'Please fill this field.').isLength({ min: 1 }),
  body('email', 'Please supply a valid email address.').isEmail(),
  body('subject', 'Please supply a meaningful subject.').isLength({ min: 5 }),
  body('message', 'Please supply a meaningful message.').isLength({ min: 10 }),
  body('message').custom((value) => {
    return new Promise((resolve, reject) => {
      if (/\[[^\]]+\]/g.test(value)) {
        reject(Error('BB Code is not allowed'))
      }

      resolve()
    })
  })
]

exports.contactFormErrorHandling = (request, response, next) => {
  const errors = validationResult(request);
  
  if (!errors.isEmpty()) {
    return response.status(422).json({
      code: 422,
      message: 'Your message could not be send! Please check your data.',
      errors: errors.mapped()
    })
  }

  next()
}

exports.sendContactForm = async (request, response) => {
  try {
    const dateNow = moment().format('YYYY-MM-DD HH:mm')

    await mail.send({
      filename: 'contact-form',
      subject: `Contact Form - ${dateNow}`,
      replyTo: request.body.email,
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