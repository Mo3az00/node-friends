const mongoose = require('mongoose')

const userProfile = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply a user!'
    },
    avatar: String,
    photo: String,
    bio: String,
    website: String    
})

module.exports = mongoose.model('UserProfile', userProfile)