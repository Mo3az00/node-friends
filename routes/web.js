const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandlers')
const ContactFormController = require('../controllers/ContactFormController')
const PagesController = require('../controllers/PagesController')
const ProfileController = require('../controllers/ProfileController')

// Homepage
router.get('/', catchErrors(PagesController.home))

// User Profile (students and teachers)
router.get('/profile/:slug', catchErrors(ProfileController.show))

// Sending the contact form
router.post('/contact',
  ContactFormController.validationRules,
  ContactFormController.errorHandling,
  catchErrors(ContactFormController.sendMail)
)

module.exports = router
