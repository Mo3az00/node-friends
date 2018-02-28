const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const ToDoController = require('../controllers/ToDoController')
const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')

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



//  absence reporting
router.get('/admin/absence-reports', catchErrors(UserController.absenceReport))

// Export our router
module.exports = router;