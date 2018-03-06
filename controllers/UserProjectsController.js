const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const UserProjects = mongoose.model('UserProjects')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')


// uploading images and resizing
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


exports.resize = async (request, response, next) => {
  if (!request.file) {
    next()
    return
  }

  const extension = request.file.mimetype.split('/'[1])
  request.body.image = `${uuid.v4()}.${extension}`

  const image = await jimp.read(request.file.buffer)
  await image.resize(800, jimp.AUTO)
  await image.write(`./public/uploads/${request.body.image}`)

  next()
}

// Display the list of the User's projects
exports.list = async (request, response) => {
  const projects = await UserProjects.find({ user: request.user._id }).sort({ order: 1 })
  response.render('admin/projects/projects', {
    title: 'Projects',
    projects
  })
}

// Display a form for adding a new project
exports.projectForm = (request, response) => {
  response.render('admin/projects/projectForm', {
    title: 'Add Project',
    project: {}
  })
}

// Validate data and save project, if okay
exports.createProject = async (request, response) => {
  const newProject = {
    user: request.user._id,
    title: request.body.title,
    link: request.body.link,
    description: request.body.description,
    image: request.body.image
  }
  const project = await (new UserProjects(newProject)).save()
  request.flash('success', `Successfully created "${project.title}"`)
  response.redirect('/admin/projects')
}

// Display form for editing a project

const confirmOwner = (project, user) => {
  if (!project.user.equals(user._id)) {
    throw Error('You must own a project in order to edit it!')
  }
}

exports.editForm = async (request, response) => {
  const project = await UserProjects.findOne({ '_id': request.params.id })

  confirmOwner(project, request.user)

  response.render('admin/projects/projectForm', {
    title: `Edit project "${project.title}"`,
    project: project
  })
}

// Validate data and updating the profile, if okay
exports.updateProject = async (request, response) => {
  const project = await UserProjects.findOneAndUpdate(
    { _id: request.params.id },
    request.body,
    { new: true, runValidators: true }
  ).exec()

  request.flash('success', `Successfully updated "${project.title}"` )
  return response.redirect('/admin/projects')
}

// deleting a project
exports.deleteProject = async (request, response) => {
  const project = await UserProjects.findOne({'_id': request.params.id}).remove()

  request.flash('success', `Successfully deleted` )
  return response.redirect('/admin/projects')
}







// make it sortable

exports.updateSortOrder = async (request, response) => {
  // Converting the new order to comparable format with the ID as property name
  const newOrder = {}

  request.body.order.forEach((id, order) => {
      newOrder[id] = order
  })

  // Get all projects and their positions and build comparable object, too
  const getOldOrder = await UserProjects.find({user: request.user._id}).sort({'order': 1})
  const oldOrders = {}

  getOldOrder.forEach((project) => {
      oldOrders[project._id.toString()] = project.order
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
          UserProjects.update({_id: item.id}, {order: item.order})
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