const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const toDoController = require('../controllers/toDoController')
const userController = require('../controllers/userController')
<<<<<<< HEAD
const projectsController = require('../controllers/projectsController')
=======
>>>>>>> cb342b5e32eb10d02176fd9b59c8b7b4b1486e44

// The main route
router.get('/', (request, response) => {
    response.render('home', {
        title: 'Home',
        description: 'My lovely first website with Node.js'
    })
})


// TO DO LIST MIXIN
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

// Projects
router.get('/admin/projects', projectsController.list)

// Export our router
module.exports = router;
