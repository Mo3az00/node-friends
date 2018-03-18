const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const ToDoController = require('../controllers/ToDoController')
const UserController = require('../controllers/UserController')
const UserProfileController = require('../controllers/UserProfileController')
const UserProjectsController = require('../controllers/UserProjectsController')
const SettingsController = require('../controllers/SettingsController')
const UserTechFavoritesController = require('../controllers/UserTechFavoritesController')
const AbsenceReportController = require('../controllers/AbsenceReportController')
const HomepageTechController = require('../controllers/HomepageTechController')
const ContactFormController = require('../controllers/ContactFormController')
const AuthController = require('../controllers/AuthController')
const PagesController = require('../controllers/PagesController')
const ProfileController = require('../controllers/ProfileController')

// The main route
router.get('/', catchErrors(PagesController.home))

// The profiles
router.get('/profile/:slug', catchErrors(ProfileController.show))

// Sending the contact form
router.post('/contact',
  ContactFormController.validationRules,
  ContactFormController.errorHandling,
  catchErrors(ContactFormController.sendMail)
)

// Admin
router.get('/admin', UserController.dashboard)

// Get all todo items
router.get('/admin/todos', catchErrors(ToDoController.getToDoList))

// Add a todo item
router.post('/admin/todos/add', catchErrors(ToDoController.createToDo))

// Update todo item order
router.post('/admin/todos/update-order', catchErrors(ToDoController.updateOrder))

// Toggle done status of a todo item
router.post('/admin/todos/update-done', catchErrors(ToDoController.updateDone))

// Delete a todo item
router.get('/admin/todos/:id/delete', catchErrors(ToDoController.deleteToDo))

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


// Enter admin interface
router.get('/admin', catchErrors(UserController.dashboard))

// PROFILE

// Edit profile form
router.get('/admin/profile/edit', catchErrors(UserProfileController.profileForm))

// Update profile
router.post('/admin/profile/edit',
  UserProfileController.uploadImages,
  UserProfileController.resizeImages,
  catchErrors(UserProfileController.updateProfile)
)

// Display student list
router.get('/admin/students', catchErrors(UserController.studentList))

// PROJECTS
// Display user's projects
router.get('/admin/projects', catchErrors(UserProjectsController.list))

// Display a form for adding a new project
router.get('/admin/projects/add', UserProjectsController.projectForm)

// Validate data and save project, if okay
router.post('/admin/projects/add',
  UserProjectsController.upload,
  UserProjectsController.uploadError,
  catchErrors(UserProjectsController.resize),
  catchErrors(UserProjectsController.createProject)
)

//Display the form for editing a project by ID
router.get('/admin/projects/:id/edit', UserProjectsController.editForm)

//Validating data and updating the profile, if okay
router.post('/admin/projects/:id/edit',
  UserProjectsController.upload,
  UserProjectsController.uploadError,
  catchErrors(UserProjectsController.resize),
  catchErrors(UserProjectsController.updateProject)
)

// deleting a project
router.get('/admin/projects/:id/delete', catchErrors(UserProjectsController.deleteProject))

// Update Projects order
router.post('/admin/projects/update-order', catchErrors(UserProjectsController.updateSortOrder))


// TECH FAVORITES
// Display the list of the User's favorite technologies
router.get('/admin/tech-favorites', catchErrors(UserTechFavoritesController.list))

//  Displaying a form for adding a new favorite tech
router.get('/admin/tech-favorites/add', UserTechFavoritesController.addForm)

// Validate data and save new favorite tech, if okay
router.post('/admin/tech-favorites/add', catchErrors(UserTechFavoritesController.createFavorite))

// Display the form for editing a favorite tech by ID
router.get('/admin/tech-favorites/:id/edit', catchErrors(UserTechFavoritesController.editForm))

// Validate data and updating the favorite tech, if okay
router.post('/admin/tech-favorites/:id/edit', catchErrors(UserTechFavoritesController.updateFavorite))

// Delete a favorite Technology
router.get('/admin/tech-favorites/:id/delete', catchErrors(UserTechFavoritesController.deleteTechFavorite))

// Update tech favorites order
router.post('/admin/tech-favorites/update-order', catchErrors(UserTechFavoritesController.updateSortOrder))

// ABSENCE REPORTS
// Display the list of reports
router.get('/admin/absence-reports', catchErrors(AbsenceReportController.list))

// Display the form to add new report
router.get('/admin/absence-reports/add', AbsenceReportController.reportForm)

// Validating data and saving the report, if okay
router.post('/admin/absence-reports/add',
  AbsenceReportController.upload,
  AbsenceReportController.uploadError,
  AbsenceReportController.uploadSuccess,
  catchErrors(AbsenceReportController.createReport)
)

// Display a form to edit a report by ID
router.get('/admin/absence-reports/:id/edit', catchErrors(AbsenceReportController.reportForm))

// HOMEPAGE TECH CONTROLLER
// Display the list of homepage technologies
router.get('/admin/homepage-technologies', catchErrors(HomepageTechController.list))

// Display the form to add a technology
router.get('/admin/homepage-technologies/add', HomepageTechController.addForm)

//  Validate data and saving the technology, if okay
router.post('/admin/homepage-technologies/add',
  HomepageTechController.upload,
  HomepageTechController.uploadError,
  catchErrors(HomepageTechController.resize),
  catchErrors(HomepageTechController.createTechnology)
)

// Display the form to edit a technology by ID
router.get('/admin/homepage-technologies/:id/edit', catchErrors(HomepageTechController.editForm))

// Validate data and update the technology, if okay
router.post('/admin/homepage-technologies/:id/edit',
  HomepageTechController.upload,
  HomepageTechController.uploadError,
  catchErrors(HomepageTechController.resize),
  catchErrors(HomepageTechController.updateTechnology)
)

// Delete a Technology
router.get('/admin/homepage-technologies/:id/delete', catchErrors(HomepageTechController.deleteTechnology))

// Update tech favorites order
router.post('/admin/homepage-technologies/update-order', catchErrors(HomepageTechController.updateSortOrder))


// SETTINGS

// edit settings
router.get('/admin/settings', catchErrors(SettingsController.form))

// submit edited settings
router.post('/admin/settings', catchErrors(SettingsController.updateSettings))


// TEST FOR EMAIL

router.get('/emailSent', (request, response) => {
  response.render('email/password-reset')
})


// Export our router
module.exports = router;