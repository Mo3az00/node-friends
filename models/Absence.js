const mongoose = require('mongoose')

const AbsenceReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user'
  },
  fromDate: {
    type: Date,
    required: 'You must supply a date'
  },
  untilDate: {
    type: Date,
    required: 'You must supply a Date'
  },
  description: {
    type: String,
    required: 'You must supply a description',
    trim: true
  },
  photo: {
    type: String
  }
})

module.exports = mongoose.model('AbsenceReport', AbsenceReportSchema)