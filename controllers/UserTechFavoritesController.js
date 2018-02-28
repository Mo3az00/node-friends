const mongoose = require('mongoose')
const UserTechFavorites = mongoose.model('UserTechFavorites')

// Displaying the list of the user's favorite technologies

exports.list = async (request, response) => {
  await response.render('admin/favorite-tech/techList', { title: 'Favorite Technologies' })
}

 // Displaying a form for adding a new favorite technologies

exports.techFavorite = (request, response) => {
  response.render('admin/favorite-tech/techForm', { title: 'Add Favorite Technology' })
}

// Validate data and save favorite technology, if okay

exports.createFavorite = async (request, response) => {
  request.body.user = request.user._id
  const max = await UserTechFavorites.findOne().sort({ order: -1 }).limit(1)
  const order = max.order + 1 || 1
  request.body.order = order
  const favorite = await (new UserTechFavorites(request.body)).save();
  request.flash('success', `Successfully added favorite technology: ${request.body.title}`)
  response.redirect('/admin/tech-favorites')
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