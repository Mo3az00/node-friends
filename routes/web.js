const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const toDoController = require('../controllers/toDoController')
const userController = require('../controllers/userController')
const favTechController = require('../controllers/UserFavoriteTechController')

// The main route
router.get('/', (request, response) => {
  response.render('home', {
    title: 'Home',
    description: 'My lovely first website with Node.js'
  })
})

router.get('/admin', userController.dashboard)

// Get all todo items
router.get('/todos', catchErrors(toDoController.getToDoList))

// Add a todo item
router.post('/todos/add', catchErrors(toDoController.createToDo))

// Delete a todo item
router.get('/todos/:id/delete', catchErrors(toDoController.deleteToDo))

// Login
router.get('/login'), catchErrors(userController.login)

// Edit profile
router.get('/profile/edit-profile', catchErrors(userController.editProfile))

// Favorite Technologies
router.get('/admin/tech-favorites', catchErrors(favTechController.list)) // Displaying the list of the user's projects
router.get('/admin/tech-favorites/add', favTechController.techFavorite) //Displaying a form for adding a new project
router.post('/admin/tech-favorites/add', catchErrors(favTechController.createFavorite)) // Validate data and save project, if okay
router.get('/admin/tech-favorites/id:/edit', catchErrors(favTechController.favoriteForm)) // Display the form for editing a project by ID
router.post('/admin/tech-favorites/:id/edit', catchErrors(favTechController.updateFavorite)) // Validating data and updating the profile, if okay

// Export our router
module.exports = router;