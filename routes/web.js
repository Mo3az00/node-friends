const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const toDoController = require('../controllers/toDoController')

// The main route
router.get('/', (request, response) => {
    response.render('home', {
        title: 'Home',
        description: 'My lovely first website with Node.js'
    })
})

// Get all todo items
router.get('/todos', catchErrors(toDoController.getToDoList))

// Add a todo item
router.post('/todos/add', catchErrors(toDoController.createToDo))

// Delete a todo item
router.get('/todos/:id/delete', catchErrors(toDoController.deleteToDo))

// Export our router
module.exports = router;
