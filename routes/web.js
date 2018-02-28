const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const ToDoController = require('../controllers/ToDoController')
const UserController = require('../controllers/UserController')
const UserProjectsController = require('../controllers/UserProjectsController')
const SettingsController = require('../controllers/SettingsController')
const UserTechFavoritesController = require('../controllers/UserTechFavoritesController')
const AbsenceReportController = require('../controllers/AbsenceReportController')
const HomepageTechController = require('../controllers/HomepageTechController')
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

// Authentication 

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

// Enter admin interface
router.get('/admin', catchErrors(UserController.dashboard))

// Display profile
router.get('/admin/User/profile/:id', catchErrors(UserController.profile))

// Edit profile

router.get('/admin/User/profile/edit', catchErrors(UserController.editProfile))

// Update profile
router.post('/profile/edit-profile', catchErrors(UserController.updateProfile))

// Display student list

router.get('admin/students', catchErrors(UserController.studentList))

// PROJECTS
// Display user's projects
router.get('/admin/projects', catchErrors(UserProjectsController.list))

// Display a form for adding a new project
router.get('/admin/projects/add', catchErrors(UserProjectsController.projectForm))

// Validate data and save project, if okay
router.post('/admin/projects/add', catchErrors(UserProjectsController.createProject))

//Display the form for editing a project by ID
router.get('/admin/projects/:id/edit', catchErrors(UserProjectsController.projectForm))

//Validating data and updating the profile, if okay
router.post('/admin/projects/:id/edit', catchErrors(UserProjectsController.updateProject))

// TECH FAVORITES
// Display the list of the User's favorite technologies
router.get('/admin/tech-favorites', catchErrors(UserTechFavoritesController.list))

//  Displaying a form for adding a new favorite tech
router.get('/admin/tech-favorites/add', catchErrors(UserTechFavoritesController.techFavorite))

// Validate data and save project, if okay
router.post('/admin/tech-favorites/add', catchErrors(UserTechFavoritesController.createFavorite))

// Display the form for editing a project by ID
router.get('/admin/tech-favorites/:id/edit', catchErrors(UserTechFavoritesController.favoriteForm))

// Validate data and updating the profile, if okay
router.post('/admin/tech-favorites/:id/edit', catchErrors(UserTechFavoritesController.updateFavorite))

// ABSENCE REPORTS
// Display the list of reports
router.get('/admin/absence-reports', catchErrors(AbsenceReportController.list))

// Display the form to add new report
router.get('/admin/absence-reports/add', catchErrors(AbsenceReportController.reportForm))

// Validating data and saving the report, if okay
router.post('/admin/absence-reports/add', catchErrors(AbsenceReportController.createReport))

// Display a form to edit a report by ID
router.get('/admin/absence-reports/:id/edit', catchErrors(AbsenceReportController.reportForm))

// Validate data and updating the report, if okay
router.post('/admin/absence-reports/:id/edit', catchErrors(AbsenceReportController.updateReport))

// Display a report given by ID
router.get('/admin/absence-reports/:id', catchErrors(AbsenceReportController.displayReport))

// HOMEPAGE TECH CONTROLLER
// Display the list of homepage technologies
router.get('/admin/homepage-technologies', catchErrors(HomepageTechController.list))

// Display the form to add a technology
router.get('/admin/homepage-technologies/add', catchErrors(HomepageTechController.technologyForm))

//  Validate data and saving the technology, if okay
router.post('/admin/homepage-technologies/add', catchErrors(HomepageTechController.createTechnology))

// Display the form to edit a technology by ID
router.get('/admin/homepage-technologies/:id/edit', catchErrors(HomepageTechController.technologyForm))

// Validate data and update the technology, if okay
router.post('/admin/homepage-technologies/:id/edit', catchErrors(HomepageTechController.updateTechnology))


// SETTINGS

// edit settings

router.get('/admin/settings', catchErrors(SettingsController.form))

// submit edited settings

router.post('/admin/settings', catchErrors(SettingsController.updateSettings))


// Export our router
module.exports = router;