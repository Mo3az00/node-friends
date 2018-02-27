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

// Display student list

router.get('admin/students', catchErrors(UserController.studentList))

// SETTINGS

// edit settings

router.get('/admin/settings', catchErrors(SettingsController.form))

// submit edited settings

router.post('/admin/settings', catchErrors(SettingsController.updateSettings))


// Export our router
module.exports = router;