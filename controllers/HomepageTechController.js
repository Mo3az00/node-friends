const mongoose = require('mongoose')
const HomepageTech = mongoose.model('HomepageTech')

// Display the list of homepage technologies
exports.list = (request, response) => {
  response.send("Display the list of homepage technologies")
}

// Display the form to add a technology
exports.technologyForm = (request, response) => {
  response.send("Display the form to add a technology")
}

// Validate data and save the technology, if okay
exports.createTechnology = (request, response) => {
  response.send("Validate data nd save the technology, if okay")
}

// Validating and update the technology, if ok
exports.updateTechnology = (request, response) => {
  response.send("Validating data and updating the report, if okay")
}