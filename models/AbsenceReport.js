const mongoose = require('mongoose')

const AbsenceReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user!'
  },
  date_begin: {
      type: Date,
      require: 'You must supply a date of the end.'
  },
  date_end: {
      type: Date,
      require: 'You must supply a date of the begin.'
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: 'You must supply a message',
    trim: true
  },
  attachment: {
    mimetype: {
      type: String
    },
    filename: {
      type: String
    }
  }
})

module.exports = mongoose.model('AbsenceReport', AbsenceReportSchema)