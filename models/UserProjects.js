const mongoose = require('mongoose')

const userProjectsSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    //required: 'Please Supply a user ID',
    trim: true
  },
  title:{
    type: String,
    required: 'Please enter a title',
    trim: true
  },
  description:{
    type: String,
    required: 'Please enter a description',
    trim: true,
  },
  image:{
    type: String,
    required: 'Please upload a photo',
    trim: true
  },
  link:{
    type: String,
    required: 'Please enter a link',
    trim: true,
  },
  order:{
    type: Number,
    // required: 'Order required'
  }
})

module.exports = mongoose.model('UserProjects', userProjectsSchema)