const mongoose = require('mongoose')
const ToDo = mongoose.model('ToDo')

// Return the list of all todo items
exports.GetToDoList = async (request, response) => {
    const todos = await ToDo.find().sort('_id')

    response.json({
        todos
    })
}

// Store a new todo item and redirect
exports.CreateToDo = async (request, response) => {
    const todo = await (new ToDo(request.body)).save()

    response.json({
        'message': 'Successfully created a new ToDo.',
        todo
    })
}

// Delete a todo item and redirect
exports.DeleteToDo = async (request, response) => {
    const todo = await ToDo.findOneAndRemove({ _id: request.params.id })

    response.json({
        'message': 'Successfully deleted the ToDo.'
    })
}