const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const UserTechFavorite = mongoose.model('UserTechFavorite')

// Displaying the list of the user's favorite technologies

exports.list = async (request, response) => {
  const techFavorites = await UserTechFavorite.find({ user: request.user._id }).sort({ order: 1 })

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
  const max = await UserTechFavorite.findOne().sort({ order: -1 }).limit(1)
  let order = 0

  if (max) {
    order = max.order + 1
  }

  request.body.order = order
  const techFavorite = await (new UserTechFavorite(request.body)).save()
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
  const techFavorite = await UserTechFavorite.findOne({ _id: request.params.id })
 
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
    
    const techFavorite = await UserTechFavorite.findOneAndUpdate(
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

exports.updateSortOrder = async (request, response) => {
  // Converting the new order to comparable format with the ID as property name
  const newOrder = {}

  request.body.order.forEach((id, order) => {
      newOrder[id] = order
  })

  // Get all favorites and their positions and build comparable object, too
  const getOldOrder = await UserTechFavorite.find({user: request.user._id}).sort({'order': 1})
  const oldOrders = {}

  getOldOrder.forEach((favorite) => {
      oldOrders[favorite._id.toString()] = favorite.order
  })

  // Check which order values are changed, after sorting and only update those entries
  const updates = []

  for (id in oldOrders) {
      if (oldOrders[id] !== newOrder[id]) {
          updates.push({
              id,
              order: newOrder[id]
          })
      }
  }

  const updatePromises = []

  updates.forEach((item) => {
      // update in the database
      updatePromises.push(
          UserTechFavorite.update({_id: item.id}, {order: item.order})
      )
  })

  Promise.all(updatePromises)
    .then((data) => {
      return response.json({
        code: 200,
        message: 'OK'
      })
    })
    .catch((error) => {
      return response.json({
        code: 500,
        error: error.response
      })
    })
}