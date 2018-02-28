const mongoose = require('mongoose');

const techSchema = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
    required: 'You must supply an ID!'
  },
  name: {
    type: String,
    trim: true,
    required: 'You must supply a name!'
  },
  description: {
    type: String,
    trim: true,
    required: 'You must supply a name!'
  },
  subtitle: {
    type: {
      type: String,
      trim: true,
      required: 'You must supply asubtitle!'
    }
  },
  description: [{
    type: String,
    trim: true,
    required: 'You must supply a description!'
  }],
  icon: {
    type: String,
    trim: true,
    required: 'You must supply an icon!'
  },
  order: {
    type: Number,
    required: 'Please enter a number!'
  }
})

module.exports = mongoose.model('HomepageTech', techSchema);