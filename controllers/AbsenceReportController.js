const mongoose = require('mongoose')
const AbsenceReport = mongoose.model('AbsenceReport')

// Display the list of the User's reports
exports.list = async (request, response) => {
  response.send("Display the list of the User's reports")
}

// Display the form to add a report
exports.reportForm = (request, response) => {
  response.send("Display the form to add a report")
}

// Validate data and saving the report, if okay
exports.createReport = async (request, response) => {
  response.send("Display the list of the User's reports")
}

// Validating data and updating the report, if okay
exports.updateReport = async (request, response) => {
  response.send("Validating data and updating the report, if okay")
}

// Display a report by given ID
exports.displayReport = async (request, response) => {
  response.send("Display a report by given ID")
}