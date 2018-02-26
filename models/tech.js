const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const techSchema = new mongoose.Schema({
user: {
type: String,
trim: true,
required: 'Please enter an ID!'
},
tech_name: String,
description: {
type: String,
trim: true,
required: 'Please enter a name!'
},
Tech_subtitle: {
type: {
type: String,
required: 'Please enter a Tech Subtitle' 
},
tech_description: [{
type: String,
required: 'You must supply a description!'
}],
icon: {
type: String,
required: 'You must supply an icon!'
},
order: {
type: String,
trim: true,
required: 'Please enter a number!'
}

module.exports = mongoose.model('Tech', techSchema);

