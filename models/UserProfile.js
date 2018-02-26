const mongoose = require('mongoose')

const userProfile = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply a user!'
    },
    avatar: String,
    photo: String,
    bio: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    }   
})

module.exports = mongoose.model('UserProfile', userProfile)