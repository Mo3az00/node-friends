const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const toDoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Please Supply a user ID'
  },
  item: {
    type: String,
    trim: true,
    required: 'Please give an item'
  },
  done: {
    type: Boolean,
    required: 'Please choose a display option'
  },
  order: {
    type: Number,
    required: 'Please add order to your list.'
  }
})

module.exports = mongoose.model('ToDo', toDoSchema)
