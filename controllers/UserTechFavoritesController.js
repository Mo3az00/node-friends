const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const UserTechFavorite = mongoose.model('UserTechFavorite')

// Display the list of all favorite technologies a user has
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

// Display the form to add a new favorite technology
exports.addForm = (request, response) => {
  response.render(
    'admin/favorite-tech/techForm',
    {
      title: 'Add Favorite Technology',
      techFavorite: {}
    }
  )
}

// Validate data and save a new favorite technology
exports.createFavorite = async (request, response) => {
  request.body.user = request.user._id
  const max = await UserTechFavorite.findOne().sort({ order: -1 }).limit(1)
  let order = 0

  if (max) {
    order = max.order + 1
  }

  request.body.order = order
  await (new UserTechFavorite(request.body)).save()

  request.flash('success', `Successfully added favorite technology: ${request.body.title}`)
  return response.redirect('/admin/tech-favorites')
}

// Verify the ownership of a favorite a user wants to edit
const confirmOwner = (techFavorite, user) => {
  if (!techFavorite.user.equals(user._id)) {
    throw Error('You must own a tech favorite in order to edit it!')
  }
}

// Display the form to edit a favorite technology
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

// Validate form data and update a favorite technology
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

// Update the order of favorite technologies
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

  for (let id in oldOrders) {
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

// Delete a favorite technology
exports.deleteTechFavorite = async (request, response) => {
  const techFavorite = await UserTechFavorite.findOne({'_id': request.params.id})
  await techFavorite.remove()

  request.flash('success', `Successfully deleted <strong>${techFavorite.title}</strong>`)
  return response.redirect('/admin/tech-favorites')
}
