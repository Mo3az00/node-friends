const mongoose = require('mongoose')
const AbsenceReport = mongoose.model('AbsenceReport')


// Display the list of the User's reports
exports.list = async (request, response) => {

}

// Display the form to add a report
exports.reportForm = async (request, response) => {
  response.render('admin/absenceReport', {
    title: 'add absence report'
  })
}

// Validate data and saving the report, if okay
exports.createReport = async (request, response) => {
  request.body.user = request.user._id;
  response.json(request.body)
  return;
}

// Validating data and updating the report, if okay
exports.updateReport = async (request, response) => {
  response.send("Validating data and updating the report, if okay")
}

// Display a report by given ID
exports.displayReport = async (request, response) => {
  response.send("Display a report by given ID")
}