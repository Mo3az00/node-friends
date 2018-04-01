const mongoose = require('mongoose')
const User = mongoose.model('User')
const multer = require('multer')
const jimp = require('jimp')

// Display the form for editing the profile of the logged-in user
exports.profileForm = async (request, response) => {
  let profile = await User.findOne({ _id: request.user._id })

  response.render('admin/users/profile/profileForm', {
    title: `Edit Your Profile`,
    profile
  })
}

// Handle the image upload and filter by type
exports.uploadImages = multer({
  storage: multer.memoryStorage(),

  fileFilter (req, file, next) {
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

// Resize the images with different thumbnail sizes
exports.resizeImages = async (request, response, next) => {
  if (Object.keys(request.files).length === 0) {
    return next()
  }

  for (let name in request.files) {
    const file = request.files[name][0]
    const extension = file.mimetype.split('/')[1]
    request.body[file.fieldname] = `${request.user._id}.${extension}`

    const image = await jimp.read(file.buffer)

    switch (file.fieldname) {
      case 'avatar':
        await image.cover(247, 247)
        break
      case 'photo':
        await image.cover(530, 350)
        break
    }

    await image.write(`./public/uploads/users/${file.fieldname}/${request.body[file.fieldname]}`)
  }

  next()
}

// Validate profile data and save
exports.updateProfile = async (request, response) => {
  await User.findOneAndUpdate(
    { _id: request.user._id },
    request.body,
    {
      new: true,
      runValidators: true
    }
  ).exec()

  request.flash('success', `Successfully updated your profile.`)
  response.redirect('/admin/profile/edit')
}
