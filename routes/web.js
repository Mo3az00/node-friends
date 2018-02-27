
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const toDoController = require('../controllers/toDoController')
const userController = require('../controllers/userController')
const express = require('express');
const router = express.Router();

// The main website routes
router.get('/', (request, response) => {
  response.render('home', {
    title: 'Home',
    description: 'The Home Area'
  })
})

router.get('/about', (request, response) => {
  response.render('about', {
    title: 'About us',
    description: 'About us'
  })
})

router.get('/tech', (request, response) => {
  response.render('tech', {
    title: 'Technologies',
    description: 'Our Technologies'
  })
})

router.get('/about', (request, response) => {
  response.render('team', {
    title: 'The Team',
    description: 'Our Team'
  })
})

router.get('/contact', (request, response) => {
  response.render('contact', {
    title: 'Contact',
    description: 'Our contact data'
  })
})

// Get all todo items
router.get('/todos', catchErrors(toDoController.getToDoList))

// Add a todo item
router.post('/todos/add', catchErrors(toDoController.createToDo))

// Login
router.get('/login'), catchErrors(userController.login)

// Edit profile
router.get('/profile/edit-profile', catchErrors(userController.editProfile))


// Export our router
module.exports = router;
