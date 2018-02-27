const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const toDoController = require('../controllers/toDoController')
const userController = require('../controllers/userController')
const usersProjectsController = require('../controllers/usersProjectsController')

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


// USER CONTROLS

// Login
router.get('/login'), catchErrors(userController.login)

// Edit profile
router.get('/profile/edit-profile', catchErrors(userController.editProfile))


// ADMIN

// Projects
router.get('/admin/projects', usersProjectsController.list)
router.get('/admin/projects/add', usersProjectsController.projectForm)
router.post('/admin/projects/add', usersProjectsController.createProject)
// router.get('/admin/projects/:id/edit', UsersProjectsController.projectForm)
// router.post('/admin/projects/:id/edit', UsersProjectsController.updateProject)

// Export our router
module.exports = router;