const mongoose = require('mongoose')
const validator = require('validator');

const AbsenceReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user'
  },
  firstName: {
    type:String,
    required: 'You must supply a user'
  },
  lastName: {
    type:String,
    required: 'You must supply a user'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  StartDate: {
      type: Date,
      default: Date.now
  },
  EndDate: {
      type: Date,
      default: Date.now
  },
  description: {
    type: String,
    required: 'You must supply a description',
    trim: true
  },
  photo:String
})

module.exports = mongoose.model('AbsenceReport', AbsenceReportSchema)