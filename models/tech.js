const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const techSchema = new mongoose.Schema({
user: {
type: String,
trim: true,
required: 'Please enter a name!'
},
title: String,
description: {
type: String,
trim: true
},
subtitle: {
type: {
type: String,
},
description: [{
type: String,
required: 'You must supply a description!'
}],
icon: {
type: String,
required: 'You must supply an icon!'
}
},
order: {
type: String,
trim: true,
required: 'Please enter a name!'
}

module.exports = mongoose.model('Tech', techSchema);

