const mongoose = require('mongoose')
const UserProjects = mongoose.model('UserProjects')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(request, file, next) {
    const isPhoto = file.mimetype.startsWith('image/')
    if(isPhoto) {
      next(null, true)
    } else {
      next({ message: 'That filetype is not allowed!'}, false)
    }
  }
}

exports.upload = multer(multerOptions).single('image')

exports.resize = async (request, response, next) => {
  if (!request.file) {
    next()
    return
  }
  const extension = request.file.mimetype.split('/'[1])
  request.body.image = `${uuid.v4()}.${extension}`
  const photo = await jimp.read(request.file.buffer)
  await photo.resize(800, jimp.AUTO)
  await photo.write(`./public/uploads/${request.body.image}`)
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
exports.editForm = async (request, response) => {
  const project = await UserProjects.findOne({ '_id': request.params.id })
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
    { new: true, runValidators: true }).exec()
  request.flash('success', `Successfully updated "${project.title}"` )
  response.redirect('/admin/projects')
}

exports.deleteProject = async (request, response) => {
  // response.render('/admin/projects/:id/deleteProject')
  const project = await UserProjects.findOne({'_id': request.params.id}).remove()
  request.flash('success', `Successfully deleted` )
  response.redirect('/admin/projects')
}