const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const ToDoController = require('../controllers/ToDoController')
const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')
const favTechController = require('../controllers/UserFavoriteTechController')

// The main route
router.get('/', (request, response) => {
  response.render('home', {
    title: 'Home',
    description: 'My lovely first website with Node.js'
  })
})

// Admin 
router.get('/admin', UserController.dashboard)
router.get('/admin/students', UserController.studentList)

// Get all todo items
router.get('/todos', catchErrors(ToDoController.getToDoList))

// Add a todo item
router.post('/todos/add', catchErrors(ToDoController.createToDo))

// Delete a todo item
router.get('/todos/:id/delete', catchErrors(ToDoController.deleteToDo))

// USER CONTROLS

router.get('/admin/login', AuthController.loginForm)
router.post('/admin/login', AuthController.login)
router.get('/admin/logout', AuthController.logout)
router.get('/admin/password-forgot', AuthController.passwordForgotten)
router.post('/admin/password-forgot', catchErrors(AuthController.passwordResetMail))
router.get('/admin/password-reset/:token', catchErrors(AuthController.passwordResetForm))
router.post('/admin/password-reset/:token',
    AuthController.confirmPasswords,
    catchErrors(AuthController.update)
)

// Edit profile
router.get('/admin/profile/edit', catchErrors(UserController.editProfile))

// Favorite Technologies
router.get('/admin/tech-favorites', catchErrors(favTechController.list)) // Displaying the list of the user's projects
router.get('/admin/tech-favorites/add', favTechController.techFavorite) //Displaying a form for adding a new project
router.post('/admin/tech-favorites/add', catchErrors(favTechController.createFavorite)) // Validate data and save project, if okay
router.get('/admin/tech-favorites/id:/edit', catchErrors(favTechController.favoriteForm)) // Display the form for editing a project by ID
router.post('/admin/tech-favorites/:id/edit', catchErrors(favTechController.updateFavorite)) // Validating data and updating the profile, if okay

// Export our router
module.exports = router;