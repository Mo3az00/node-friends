const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const HomepageTech = mongoose.model('HomepageTech')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')
const fs = require('fs')

// Display the list of technologies
exports.list = async (request, response) => {
  const technologies = await HomepageTech.find({ user: request.user._id }).sort({ order: 1 })

  response.render(
    'admin/homepage-tech/homepageTechList',
    {
      title: 'Technologies',
      technologies
    }
  )
}

// Display the form for adding a new technology
exports.addForm = (request, response) => {
  response.render(
    'admin/homepage-tech/homepageTechForm',
    {
      title: 'Add a Technology',
      technology: {}
    }
  )
}

// Storage settings for the image uploads
const storage = multer.diskStorage({
  destination: function (request, file, next) {
    next(null, './temp')
  },
  filename: function (request, file, next) {
    next(null, uuid(4))
  }
})

// Handling the image upload
exports.upload = multer({
  storage,
  limits: {
    fileSize: 10000000 // 10 MB
  },
  fileFilter (request, file, next) {
    if (file.mimetype.startsWith('image/')) {
      next(null, true)
    } else {
      next({ message: 'That filetype is not allowed!' }, false)
    }
  }
}).single('image')

// Upload error handling
exports.uploadError = function (error, request, response, next) {
  if (error) {
    let message = 'Error during file upload. Please try again later.'

    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'The file is too large. Max. 10 MB allowed!'
        break

      case 'FILETYPE_NOT_ALLOWED':
        message = 'The file type is not allowed. Only images!'
        break
    }

    request.flash('danger', message)
    return response.redirect('back')
  }

  next()
}

// Resizing and moving the image file
exports.resize = async (request, response, next) => {
  if (!request.file) {
    next()
    return
  }

  const extension = request.file.mimetype.split('/')[1]
  request.body.image = `${uuid.v4()}.${extension}`

  const image = await jimp.read(request.file.path)
  await image.cover(248, 130)
  await image.write(`./public/uploads/homepage-technologies/${request.body.image}`)
  fs.unlinkSync(request.file.path)

  next()
}

// Validating data and saving the technology
exports.createTechnology = async (request, response) => {
  request.body.user = request.user._id
  const max = await HomepageTech.findOne().sort({ order: -1 }).limit(1)
  let order = 0

  if (max) {
    order = max.order + 1
  }

  request.body.order = order
  await (new HomepageTech(request.body)).save()

  request.flash('success', `Successfully added technology: ${request.body.title}`)
  return response.redirect('/admin/homepage-technologies')
}

// Validating that a user is the owner of a technology
const confirmOwner = (technology, user) => {
  if (!technology.user.equals(user._id)) {
    throw Error('You must own a technology in order to edit it!')
  }
}

// Display the form for editing a technology
exports.editForm = async (request, response) => {
  const technology = await HomepageTech.findOne({ _id: request.params.id })
  confirmOwner(technology, request.user)

  response.render(
    'admin/homepage-tech/homepageTechForm', {
      title: `Edit ${technology.title}`,
      technology
    }
  )
}

// Validating data and updating technology
exports.updateTechnology = async (request, response) => {
  request.body.user = request.user._id

  const technology = await HomepageTech.findOneAndUpdate(
    { _id: request.params.id },
    request.body,
    {
      new: true,
      runValidators: true
    }
  ).exec()

  request.flash('success', `Successfully updated <strong>${technology.title}</strong>`)
  return response.redirect(`/admin/homepage-technologies`)
}

// Deleting a technology
exports.deleteTechnology = async (request, response) => {
  const technology = await HomepageTech.findOne({ '_id': request.params.id })
  await technology.remove()

  request.flash('success', `Successfully deleted <strong>${technology.title}</strong>`)
  return response.redirect('/admin/homepage-technologies')
}

// Update the order of technologies
exports.updateSortOrder = async (request, response) => {
  // Converting the new order to a comparable format with the ID as property name
  const newOrder = {}

  request.body.order.forEach((id, order) => {
    newOrder[id] = order
  })

  // Get all technologies and their positions and build comparable object
  const getOldOrder = await HomepageTech.find({ user: request.user._id }).sort({ 'order': 1 })
  const oldOrders = {}

  getOldOrder.forEach((technology) => {
    oldOrders[technology._id.toString()] = technology.order
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
    updatePromises.push(
      HomepageTech.update({ _id: item.id }, { order: item.order })
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
