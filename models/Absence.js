const mongoose = require('mongoose')

const AbsenceReport = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user'
  },
  form: {
    type: Date,
    required: 'You must supply a title',
    trim: true
  },
  untilDate: {
    type: Date,
    required: 'You must supply a Date',
    trim: true
  },
  description: {
    type: String,
    required: 'You must supply a description',
    trim: true
  },
  photo: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('AbsenceReport', AbsenceReport)