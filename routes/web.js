const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const toDoController = require('../controllers/ToDoController')
const userController = require('../controllers/UserController')


// The main route
router.get('/', (request, response) => {
    response.render('home', {
        title: 'Home',
        description: 'My lovely first website with Node.js'
    })
})


// TO DO LIST MIXIN
// Get all todo items
router.get('/todos', catchErrors(ToDoController.getToDoList))

// Add a todo item
router.post('/todos/add', catchErrors(ToDoController.createToDo))

// Delete a todo item
router.get('/todos/:id/delete', catchErrors(ToDoController.deleteToDo))


// USER CONTROLS

// Login
router.get('/login', catchErrors(UserController.login))

// Edit profile
router.get('/profile/edit-profile', catchErrors(UserController.editProfile))


// Export our router
module.exports = router;
