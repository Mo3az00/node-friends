const mongoose = require('mongoose')
const User = mongoose.model('User')
const HomepageTech = mongoose.model('HomepageTech')
const moment = require('moment-business-days')

moment.locale('us', {
  workingWeekdays: [1,2,3,4,5],
  holidays: [
    '21-09-2017',
    '22-09-2017',
    '02-10-2017',
    '04-10-2017',
    '05-10-2017',
    '06-10-2017',
    '30-10-2017',
    '25-12-2017',
    '26-12-2017',
    '27-12-2017',
    '28-12-2017',
    '29-12-2017',
    '31-12-2017',
    '01-01-2018',
    '02-01-2018',
    '03-01-2018',
    '04-01-2018',
    '05-01-2018',
    '26-03-2018',
    '27-03-2018',
    '28-03-2018',
    '29-03-2018',
    '30-03-2018',
    '02-04-2018',
    '01-05-2018',
    '11-05-2018',
    '21-05-2018',
    '11-06-2018',
    '12-06-2018',
    '13-06-2018',
    '13-06-2018',
    '14-06-2018',
    '15-06-2018'
  ]
});

// Home Page

exports.home = async (request, response) => {
  // Calculating days learned and days left
  const now = moment()
  const courseStart = moment([2017, 9, 4])
  const courseEnd = moment([2018, 8, 16])
  const daysLearned = now.businessDiff(courseStart)
  const daysLeft = courseEnd.businessDiff(now)

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