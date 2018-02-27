const mongoose = require('mongoose')
const Tech = mongoose.model('HomepageTech')

// Display the list of the User's technologies
exports.list = (request, response) => {
  response.send("Display the list of the User's projects")
}

// Display a form for adding a new technology
exports.techFavorite = (request, response) => {
  response.send("Display a form for adding a new project")
}

// Validate data and save technology, if okay
exports.createFavorite = (request, response) => {
  response.send("Validate data and save project, if okay")
}

// Validate data and updating the technology, if okay
exports.updateFavorite = (request, response) => {
  response.send("Validate data and save project, if okay")
}

