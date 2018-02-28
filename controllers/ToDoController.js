const mongoose = require('mongoose')
const ToDo = mongoose.model('ToDo')

// Return the list of all todo items
exports.getToDoList = async (request, response) => {
    const todos = await ToDo.find().sort('order')

    response.json(todos)
}

// Store a new todo item and redirect
exports.createToDo = async (request, response) => {
    request.body.user = request.user._id
    request.body.order = 0
    request.body.done = (request.body.done === 1)

    const todo = await (new ToDo(request.body)).save()

    response.json(todo)
}

// Toggle the done status
exports.updateDone = async (request, response) => {
    const todo = await ToDo.findOneAndUpdate(
        { _id: request.body.id },
        { done: request.body.done }
    )

    response.json(todo)
}

// Delete a todo item and redirect
exports.deleteToDo = async (request, response) => {
    const todo = await ToDo.findOneAndRemove({ _id: request.params.id })

    response.json({
        'message': 'Successfully deleted the ToDo.'
    })
}

