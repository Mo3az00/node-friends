const mongoose = require('mongoose')
const HomepageTech = mongoose.model('HomepageTech')
mongoose.Promise = global.Promise
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')
const fs = require('fs')

// Displaying the list of the user's technologies

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

// Displaying a form for adding a new technologies

exports.addForm = (request, response) => {
  response.render(
    'admin/homepage-tech/homepageTechForm',
    {
      title: 'Add a Technology',
      technology: {}
    }
  )
}

// Validate data and save technology, if okay

exports.createTechnology = async (request, response) => {
  request.body.user = request.user._id
  const max = await HomepageTech.findOne().sort({ order: -1 }).limit(1)
  let order = 0

  if (max) {
    order = max.order + 1
  }

  request.body.order = order
  const technology = await (new HomepageTech(request.body)).save()
  request.flash('success', `Successfully added technology: ${request.body.title}`)
  response.redirect('/admin/homepage-technologies')
  return
}

// Display the form for editing a technology by ID

const confirmOwner = (technology, user) => {
  if (!technology.user.equals(user._id)) {
    throw Error('You must own a technology in order to edit it!')
  }
}

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

// Deleting a technology
exports.deleteTechnology = async (request, response) => {
  const technology = await HomepageTech.findOne({'_id': request.params.id})
  request.flash('success', `Successfully deleted <strong>${technology.title}</strong>` )
  await technology.remove()
  return response.redirect('/admin/homepage-technologies')
}

// Validating data and updating the profile, if okay

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
    response.redirect(`/admin/homepage-technologies`)
}

// Sorts the table

exports.updateSortOrder = async (request, response) => {
  // Converting the new order to comparable format with the ID as property name
  const newOrder = {}

  request.body.order.forEach((id, order) => {
      newOrder[id] = order
  })

  // Get all technologies and their positions and build comparable object, too
  const getOldOrder = await HomepageTech.find({user: request.user._id}).sort({'order': 1})
  const oldOrders = {}

  getOldOrder.forEach((technology) => {
      oldOrders[technology._id.toString()] = technology.order
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
        HomepageTech.update({_id: item.id}, {order: item.order})
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

// Uploading image and filtering by type
const storage = multer.diskStorage({
  destination: function(request, file, next) {
    next(null, './temp')
  },
  filename: function(request, file, next) {
    next(null, uuid(4))
  }
})

exports.upload = multer({
  storage,
  limits: {
    fileSize: 10000000, // 10 MB
  },
  fileFilter(request, file, next) {
    const isImage = file.mimetype.startsWith('image/')
    if(isImage) {
      next(null, true)
    } else {
      next({ message: 'That filetype is not allowed!'}, false)
    }
  }
})
.single('image')

// Upload error handling
exports.uploadError = function(error, request, response, next) {
  if (error) {
    let message = 'Error during file upload. Please try again later.'
    
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
      message = 'The file is too large. Max. 10 MB allowed!'
        break;
        
        case 'FILETYPE_NOT_ALLOWED':
        message = 'The file type is not allowed. Only images and PDF!'
        break;
      }
      
      request.flash('danger', message)
      return response.redirect('back')
    }
    
    next()
  }
  
  // Successfully upload handling and file movement

// resize an image
exports.resize = async (request, response, next) => {
  if (!request.file) {
    next()
    return
  }

  const extension = request.file.mimetype.split('/')[1]
  request.body.image = `${uuid.v4()}.${extension}`

  const image = await jimp.read(request.file.path)
  await image.cover(245, 130)
  await image.write(`./public/uploads/homepage-technologies/${request.body.image}`)
  fs.unlinkSync(request.file.path)

  next()
}