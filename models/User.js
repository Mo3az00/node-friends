const mongoose = require('mongoose')
const validator = require('validator')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: 'You must provide a first name'
  },
  last_name: {
    type: String,
    required: 'You must provide a last name'
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address'],
    required: 'Please supply an email address'
  },
  bio: {
    type: String,
    trim: true
  },
  birthday: { type: Date },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[0-9\- +\(\)\/]+$/.test(v)
      },
      message: 'Please supply a valid phone number!'
    }
  },
  website: {
    type: String,
    trim: true,
    validate: [validator.isURL, 'Please supply a valid URL for your website!'],
  },
  avatar: String,
  photo: String,
  slug: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('User', userSchema)