const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandlers')

const AuthController = require('../controllers/AuthController')
const UserController = require('../controllers/UserController')
const UserProfileController = require('../controllers/UserProfileController')
const UserProjectsController = require('../controllers/UserProjectsController')
const UserTechFavoritesController = require('../controllers/UserTechFavoritesController')
const ToDoController = require('../controllers/ToDoController')
const AbsenceReportController = require('../controllers/AbsenceReportController')
const HomepageTechController = require('../controllers/HomepageTechController')

/* User Authentication
------------------------------------------ */

router.get('/login', AuthController.loginForm)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.get('/password-forgot', AuthController.passwordForgotten)
router.post('/password-forgot', catchErrors(AuthController.passwordResetMail))
router.get('/password-reset/:token', catchErrors(AuthController.passwordResetForm))
router.post('/password-reset/:token',
  AuthController.confirmPasswords,
  catchErrors(AuthController.update)
)

/* Dashboard
------------------------------------------ */

// Dashboard
router.get('/', UserController.dashboard)

// ToDo Widget API
router.get('/todos', catchErrors(ToDoController.getToDoList))
router.post('/todos/add', catchErrors(ToDoController.createToDo))
router.post('/todos/update-done', catchErrors(ToDoController.updateDone))
router.post('/todos/update-order', catchErrors(ToDoController.updateOrder))
router.get('/todos/:id/delete', catchErrors(ToDoController.deleteToDo))

/* User Profile
------------------------------------------ */

router.get('/profile/edit', catchErrors(UserProfileController.profileForm))
router.post('/profile/edit',
  UserProfileController.uploadImages,
  UserProfileController.resizeImages,
  catchErrors(UserProfileController.updateProfile)
)

/* Students
------------------------------------------ */

router.get('/students', catchErrors(UserController.studentList))

/* Absence Reports
------------------------------------------ */

router.get('/absence-reports', catchErrors(AbsenceReportController.list))
router.get('/absence-reports/add', AbsenceReportController.reportForm)
router.post('/absence-reports/add',
  AbsenceReportController.upload,
  AbsenceReportController.uploadError,
  AbsenceReportController.uploadSuccess,
  catchErrors(AbsenceReportController.createReport)
)
router.get('/absence-reports/:id/edit', catchErrors(AbsenceReportController.reportForm))

/* User Tech Favorites
------------------------------------------ */

router.get('/tech-favorites', catchErrors(UserTechFavoritesController.list))
router.get('/tech-favorites/add', UserTechFavoritesController.addForm)
router.post('/tech-favorites/add', catchErrors(UserTechFavoritesController.createFavorite))
router.get('/tech-favorites/:id/edit', catchErrors(UserTechFavoritesController.editForm))
router.post('/tech-favorites/:id/edit', catchErrors(UserTechFavoritesController.updateFavorite))
router.get('/tech-favorites/:id/delete', catchErrors(UserTechFavoritesController.deleteTechFavorite))
router.post('/tech-favorites/update-order', catchErrors(UserTechFavoritesController.updateSortOrder))

/* User Projects
------------------------------------------ */

router.get('/projects', catchErrors(UserProjectsController.list))
router.get('/projects/add', UserProjectsController.projectForm)
router.post('/projects/add',
  UserProjectsController.upload,
  UserProjectsController.uploadError,
  catchErrors(UserProjectsController.resize),
  catchErrors(UserProjectsController.createProject)
)
router.get('/projects/:id/edit', UserProjectsController.editForm)
router.post('/projects/:id/edit',
  UserProjectsController.upload,
  UserProjectsController.uploadError,
  catchErrors(UserProjectsController.resize),
  catchErrors(UserProjectsController.updateProject)
)
router.get('/projects/:id/delete', catchErrors(UserProjectsController.deleteProject))
router.post('/projects/update-order', catchErrors(UserProjectsController.updateSortOrder))

/* Homepage Technologies
------------------------------------------ */

router.get('/homepage-technologies', catchErrors(HomepageTechController.list))
router.get('/homepage-technologies/add', HomepageTechController.addForm)
router.post('/homepage-technologies/add',
  HomepageTechController.upload,
  HomepageTechController.uploadError,
  catchErrors(HomepageTechController.resize),
  catchErrors(HomepageTechController.createTechnology)
)
router.get('/homepage-technologies/:id/edit', catchErrors(HomepageTechController.editForm))
router.post('/homepage-technologies/:id/edit',
  HomepageTechController.upload,
  HomepageTechController.uploadError,
  catchErrors(HomepageTechController.resize),
  catchErrors(HomepageTechController.updateTechnology)
)
router.get('/homepage-technologies/:id/delete', catchErrors(HomepageTechController.deleteTechnology))
router.post('/homepage-technologies/update-order', catchErrors(HomepageTechController.updateSortOrder))

module.exports = router
