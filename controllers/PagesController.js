const mongoose = require('mongoose')
const User = mongoose.model('User')
const HomepageTech = mongoose.model('HomepageTech')
const momentBusiness = require('moment-business-days')
const holidays = require('../data/holidays')

// Set the course holidays for Moment.js
momentBusiness.locale('us', {
  workingWeekdays: [1, 2, 3, 4, 5],
  holidayFormat: 'YYYY-MM-DD',
  holidays
})

// Home Page
exports.home = async (request, response) => {
  // Calculating days learned and days left
  const now = momentBusiness()
  const courseStart = momentBusiness([2017, 9, 4])
  const courseEnd = momentBusiness([2018, 8, 16])
  const daysLearned = now.businessDiff(courseStart)
  const daysLeft = courseEnd.businessDiff(now)

  // Loading data
  const technologies = await HomepageTech.find().sort({ 'order': 1 })
  const students = await User.find({ role: 'student' }).sort({ 'first_name': 1 })
  const teachers = await User.find({ role: 'teacher' }).sort({ 'first_name': 1 })

  // Rendering the template
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
