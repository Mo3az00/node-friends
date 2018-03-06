const mongoose = require('mongoose')
const User = mongoose.model('User')
const UserProfile = mongoose.model('UserProfile')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

// Edit profile form
exports.profileForm = async (request, response) => {
  let profile = await UserProfile.findOne({ user: request.user._id })
    .populate('user')

  if (!profile) {
    profile = await (new UserProfile({
      user: request.user._id
    })).save()
  }

  response.render('admin/users/profile/profileForm', {
    title: `Edit Your Profile`,
    profile
  })
}

// Image upload
exports.uploadImages = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/')
    if (isPhoto) {
      next(null, true)
    } else {
      next({ message: 'That filetype is not allowed!' }, false)
    }
  }
})
.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
])

exports.resizeImages = async (request, response, next) => {
  if (Object.keys(request.files).length === 0) {
    next()
    return
  }

  for (name in request.files) {
    const file = request.files[name][0]
    const extension = file.mimetype.split('/')[1]
    request.body[file.fieldname] = `${request.user._id}.${extension}`

    const photo = await jimp.read(file.buffer)

    switch (file.fieldname) {
      case 'avatar':
        await photo.resize(200, jimp.AUTO)
        break
      case 'photo':
        await photo.resize(400, jimp.AUTO)
        break
    }

    await photo.write(`./public/uploads/users/${file.fieldname}/${request.body[file.fieldname]}`)
  }

  next()
}

// Update profile
exports.updateProfile = async (request, response) => {
  const profile = await UserProfile.findOneAndUpdate(
    { user: request.user._id },
    request.body,
    { new: true }
  )
  .exec()

  request.flash('success', `successfully updated your profile.`)
  response.redirect('/admin/profile/edit')
}