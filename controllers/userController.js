const mongoose = require('mongoose')
const User = mongoose.model('User')

// LOGIN

exports.login = (request, response) => {
    response.render('user/login', { title: 'Login' })
}

// EDIT PROFILE

exports.editProfile = (request, response) => {
    response.render('user/edit-profile', {
        title: 'Edit your profile'
    })
}

