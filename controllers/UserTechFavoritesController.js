const mongoose = require('mongoose')
const UserTechFavorites = mongoose.model('UserTechFavorites')

// Displaying the list of the user's favorite technologies

exports.list = async (request, response) => {
  const techFavorites = await UserTechFavorites.find({ user: request.user._id }).sort({ order: 1 })

  response.render(
    'admin/favorite-tech/techList', 
    { 
      title: 'Favorite Technologies',
      techFavorites
    }
  )
}

// Displaying a form for adding a new favorite technologies

exports.addForm = (request, response) => {
  response.render(
    'admin/favorite-tech/techForm',
    {
      title: 'Add Favorite Technology',
      techFavorite: {}
    }
  )
}

// Validate data and save favorite technology, if okay

exports.createFavorite = async (request, response) => {
  request.body.user = request.user._id
  const max = await UserTechFavorites.findOne().sort({ order: -1 }).limit(1)
  let order = 0

  if (max) {
    order = max.order + 1
  }

  request.body.order = order
  const techFavorite = await (new UserTechFavorites(request.body)).save()
  request.flash('success', `Successfully added favorite technology: ${request.body.title}`)
  response.redirect('/admin/tech-favorites')
  return
}

// Display the form for editing a favorite technology by ID

const confirmOwner = (techFavorite, user) => {
  if (!techFavorite.user.equals(user._id)) {
    throw Error('You must own a tech favorite in order to edit it!')
  }
}

exports.editForm = async (request, response) => {
  const techFavorite = await UserTechFavorites.findOne({ _id: request.params.id })
 
  confirmOwner(techFavorite, request.user)

  response.render(
    'admin/favorite-tech/techForm', {
      title: `Edit ${techFavorite.title}`,
      techFavorite
    }
  )
}

// Validating data and updating the profile, if okay

exports.updateFavorite = async (request, response) => {
    request.body.user = request.user._id
    
    const techFavorite = await UserTechFavorites.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      {
        new: true,
        runValidators: true
      }
    ).exec()

    request.flash('success', `Successfully updated <strong>${techFavorite.title}</strong>`)
    response.redirect(`/admin/tech-favorites`)
}