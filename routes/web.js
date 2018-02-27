const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const ToDoController = require('../controllers/ToDoController')
const UserController = require('../controllers/UserController')

// The main route
router.get('/', (request, response) => {
    response.render('home', {
        title: 'Home',
        description: 'My lovely first website with Node.js'
    })
})

// Admin 
router.get('/admin', UserController.admin)
router.get('/admin/students', UserController.studentList)

// Get all todo items
router.get('/admin/todos', catchErrors(ToDoController.getToDoList))

// Add a todo item
router.post('/admin/todos/add', catchErrors(ToDoController.createToDo))

// Delete a todo item
router.get('/admin/todos/:id/delete', catchErrors(ToDoController.deleteToDo))


// USER CONTROLS

// Login
router.get('/login'), catchErrors(UserController.login)

// Edit profile
router.get('/profile/edit-profile', catchErrors(UserController.editProfile))



// USER CONTROLS

// Login
router.get('/login'), catchErrors(UserController.login)

// Edit profile
router.get('/profile/edit-profile', catchErrors(UserController.editProfile))


// Export our router
module.exports = router;