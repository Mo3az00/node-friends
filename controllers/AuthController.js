const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')
const crypto = require('crypto')
const mail = require('../handlers/mail')
const promisify = require('es6-promisify')

// Login form
exports.loginForm = (request, response) => {
    response.render('admin/users/login', {
        title: 'Login'
    })
}

// Login send
exports.login = passport.authenticate('local', {
    failureRedirect: '/admin/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/admin',
    successFlash: null
})

// Logout
exports.logout = (request, response) => {
    request.logout()
    request.flash('success', 'You are now logged out.')
    response.redirect('/admin/login')
}

// Check permissions for logged-in users
exports.isLoggedIn = (request, response, next) => {
    if (request.isAuthenticated()) {
        next()
        return
    }

    request.flash('danger', 'Ooops! You must be logged in to do that!')
    response.redirect('/admin/login') 
}

// Password forgotten email form
exports.passwordForgotten = (request, response) => {
    response.render('admin/users/password-forgotten', {
        title: 'Reset your password'
    })
}

// Password forgotten email
exports.passwordResetMail = async (request, response) => {
    const user = await User.findOne({ email: request.body.email })
    const message = `A password reset email has been sent to <strong>${request.body.email}</strong>.`

    if (!user) {
        request.flash('success', message)
        return response.redirect('/admin/login')
    }
  
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
    user.resetPasswordExpires = Date.now() + (1000 * 60 * 60) // 1 hour from now
    await user.save()
  
    const resetURL = `${request.secure ? 'https://' : 'http://'}${request.headers.host}/admin/password-reset/${user.resetPasswordToken}`
  
    await mail.send({
        filename: 'password-reset',
        subject: 'Password Reset',
        to: request.user.email,
        user,
        resetURL
    })
  
    request.flash('success', message)
    response.redirect('/admin/login') 
  }

  exports.passwordResetForm = async (request, response) => {
    const user = await User.findOne({
        resetPasswordToken: request.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
        request.flash('danger', 'Password reset is invalid or has expired.')
        return response.redirect('/admin/login')
    }

    response.render('admin/users/password-reset', {
        title: 'Reset your password'
    })
}

  // Check if password + confirmation are identical
  exports.confirmPasswords = (request, response, next) => {
    if (!request.body.password  || !request.body['password-confirm']) {
        request.flash('danger', 'Please fill in both fields!')
        return response.redirect('back')
    }

    if (request.body.password === request.body['password-confirm']) {
        next()
        return
    }

    request.flash('danger', 'Passwords do not match.')
    response.redirect('back')
}

// Update the user#s password
exports.update = async (request, response) => {
    const user = await User.findOne({
        resetPasswordToken: request.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
        request.flash('danger', 'Password reset is invalid or has expired.')
        return response.redirect('/admin/login')
    }

    const setPassword = promisify(user.setPassword, user)
    await setPassword(request.body.password)

    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    const updatedUser = await user.save()

    await request.login(updatedUser)

    request.flash('success', 'Your password was successfully reset. You are now logged in!')
    response.redirect('/admin')
}