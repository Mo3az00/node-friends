const mongoose = require('mongoose')
const User = mongoose.model('UserTech')

// Displaying the list of the user's favorite technologies

exports.list = async (request, response) => {
  await response.render('admin/favorite-tech/techList', { title: 'Favorite Technologies' })
}

 // Displaying a form for adding a new favorite technologies

exports.techFavorite = (request, response) => {
  response.render('admin/favorite-tech/techForm', { title: 'Add Favorite Technology' })
  // response.json(request.body)
}

// Validate data and save favorite technology, if okay

exports.createFavorite = async (request, response) => {
  console.log(request.body)
 //response.json(request.body)
 response.send(' create favorite worked')
 return
}

// Display the form for editing a favorite technology by ID

exports.favoriteForm = async (request, response) => {
  response.render('admin/favorite-tech/techEdit', { title: 'Edit Favorite Technology' })
}

// Validating data and updating the profile, if okay

exports.updateFavorite = async (request, response) => {
  await response.send('WORKS!')
}