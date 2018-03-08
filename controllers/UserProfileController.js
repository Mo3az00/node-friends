const mongoose = require('mongoose')
const User = mongoose.model('User')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

// Edit profile form
exports.profileForm = async (request, response) => {
  let profile = await User.findOne({ _id: request.user._id })

  response.render('admin/users/profile/profileForm', {
    title: `Edit Your Profile`,
    profile
  })
}

// Image upload
exports.uploadImages = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    if (file.mimetype.startsWith('image/')) {
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

    const image = await jimp.read(file.buffer)

    switch (file.fieldname) {
      case 'avatar':
        await image.cover(250, 150)
        break
      case 'photo':
        await image.cover(285, 197)
        break
    }

    await image.write(`./public/uploads/users/${file.fieldname}/${request.body[file.fieldname]}`)
  }

  next()
}

// Update profile
exports.updateProfile = async (request, response) => {
  const profile = await User.findOneAndUpdate(
    { _id: request.user._id },
    request.body,
    {
      new: true,
      runValidators: true
    }
  )
    .exec()

  request.flash('success', `Successfully updated your profile.`)
  response.redirect('/admin/profile/edit')
}