const { body, validationResult } = require('express-validator/check')
const moment = require('moment')
const mail = require('../handlers/mail')

// Validation rules are applied before any other middleware
exports.validationRules = [
  body(['name', 'email', 'subject', 'message'], 'Please fill this field.').isLength({ min: 1 }),
  body('email', 'Please supply a valid email address.').isEmail(),
  body('subject', 'Please supply a meaningful subject.').isLength({ min: 5 }),
  body('message', 'Please supply a meaningful message.').isLength({ min: 10 }),
  body('message').custom((value) => {
    return new Promise((resolve, reject) => {
      if (/\[[^\]]+\]/g.test(value)) {
        reject(Error('BB Code is not allowed'))
      }

      resolve()
    })
  })
]

// Handling validation errors
exports.errorHandling = (request, response, next) => {
  const errors = validationResult(request)

  if (!errors.isEmpty()) {
    return response.status(422).json({
      code: 422,
      message: 'Your message could not be send! Please check your data.',
      errors: errors.mapped()
    })
  }

  next()
}

// Sending the form data, after successful validation
exports.sendMail = async (request, response) => {
  try {
    const dateNow = moment().format('YYYY-MM-DD HH:mm')

    await mail.send({
      filename: 'contact-form',
      subject: `Contact Form - ${dateNow}`,
      replyTo: request.body.email,
      name: request.body.name,
      email: request.body.email,
      message: request.body.message
    })
  } catch (error) {
    return response.status(500).json({
      code: 500,
      error: error.message,
      message: 'Something went wrong sending the email. Please try again later.'
    })
  }

  return response.json({
    code: 200,
    message: 'OK'
  })
}
