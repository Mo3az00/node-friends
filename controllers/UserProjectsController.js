const mongoose = require('mongoose')
const UserProjects = mongoose.model('UserProjects')

// Display the list of the User's projects
exports.list = async (request, response) => {
  response.send('Display the list of the user\'s projects')
}

// Display a form for adding a new project
exports.projectForm = (request, response) => {
  response.send('Display a form for adding a new project')
}

// Validate data and save project, if okay
exports.createProject = async (request, response) => {
  response.send('Validate data and save project, if okay')
}

// Validate data and updating the profile, if okay
exports.updateProject = async (request, response) => {
  response.send('Validate data and save project, if okay')
}