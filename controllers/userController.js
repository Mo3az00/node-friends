const mongoose = require('mongoose')
const User = mongoose.model('User')

// Login
exports.Login = (request, response) => {
    response.render('user/login', { title: 'Login' })
}

// Profile
exports.EditProfile = (request, response) => {
    response.render('user/edit-profile', {
        title: 'Edit your profile'
    })
}

