const mongoose = require('mongoose')
const User = mongoose.model('User')
const promisify = require('es6-promisify')

// LOGIN

exports.login = (request, response) => {
    response.render('users/user-login', { title: 'Login' })
}

// EDIT PROFILE

exports.editProfile = (request, response) => {
    response.render('user/edit-profile', {
        title: 'Edit your profile'
    })
}

