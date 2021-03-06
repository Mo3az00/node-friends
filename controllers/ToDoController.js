const mongoose = require('mongoose')
const ToDo = mongoose.model('ToDo')

// Return all todo items
exports.getToDoList = async (request, response) => {
  const todos = await ToDo.find({ user: request.user._id }).sort('order')
  response.json(todos)
}

// Store a new todo item
exports.createToDo = async (request, response) => {
  request.body.user = request.user._id
  request.body.order = 0
  request.body.done = (request.body.done === 1)

  const todo = await (new ToDo(request.body)).save()

  response.json(todo)
}

// Toggle the done status
exports.updateDone = async (request, response) => {
  const todo = await ToDo.findOne({ _id: request.body.id })

  todo.done = request.body.done
  todo.save()

  return response.json(todo)
}

exports.updateOrder = async (request, response) => {
  const newOrder = {}

  request.body.order.forEach((id, order) => {
    newOrder[id] = order
  })

  const getOldOrder = await ToDo.find({ user: request.user._id }).sort({ 'order': 1 })
  const oldOrders = {}

  if (getOldOrder.length) {
    getOldOrder.forEach((todo) => {
      oldOrders[todo._id] = todo.order
    })
  }

  const updates = []

  for (let id in oldOrders) {
    if (oldOrders[id] !== newOrder[id]) {
      updates.push({
        id,
        order: newOrder[id]
      })
    }
  }

  const updatePromises = []

  updates.forEach((item) => {
    updatePromises.push(
      ToDo.update({ _id: item.id }, { order: item.order })
    )
  })

  Promise.all(updatePromises)
    .then((data) => {
      return response.json({
        code: 200,
        message: 'OK'
      })
    })
    .catch((error) => {
      return response.json({
        code: 500,
        error: error.response
      })
    })
}

// Delete a todo item and redirect
exports.deleteToDo = async (request, response) => {
  const todo = await ToDo.findOneAndRemove({ _id: request.params.id })
  response.json(todo)
}
