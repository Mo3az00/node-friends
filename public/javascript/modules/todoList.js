import axios from 'axios'

const todoList = document.querySelector('#todo-list')
const loading = document.querySelector('#todo-list-loading')
const error = document.querySelector('#todo-list-error')

function addToDo (todo) {
  if (todo.item.length === 0) {
    todoError('Please supply a text for your item!')
    return
  }

  error.classList.add('hidden')

  axios
    .post('/admin/todos/add', todo)
    .then((response) => {
      todoList.innerHTML += buildToDoListItem(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

function loadToDoList() {
  axios.get('/admin/todos')
      .then(function (response) {
          buildToDoList(response.data)
          toggleLoading()
      })
      .catch(function (error) {
          console.log(error.message)
          toggleLoading()
      })
}

function buildToDoListItem(todo) {
  return `
  <div class="lists-container container p-0 pl-2" data-id="${todo._id}">
    <button class="btn btn-sm p-0 mr-2" type="button" id="move-todolist">
      <i class="fa fa-arrows" aria-hidden="true"></i>
    </button>
    <div class="custom-control custom-checkbox d-inline-flex">
      <input class="custom-control-input" id="todo-${todo._id}" type="checkbox">
      <label class="custom-control-label" for="todo-${todo._id}">${todo.item}</label>
    </div>
    <i class="icon-remove fa fa-remove float-right"></i>
  </div>
  ` 
}

function buildToDoList(todos) {
  let markup = ''

  if (todos.length !== 0) {
      markup = todos.map((todo) => {
          return buildToDoListItem(todo)
      }).join('')
  }

  todoList.innerHTML = markup
  registerListEvents()
}

function removeItem(e) {
  const toDoItem = this.closest('.lists-container')
  const toDoId = toDoItem.dataset.id
  const confirmed = confirm('Really delete this entry?')

  if (confirmed) {
      axios.get(`/admin/todos/${toDoId}/delete/`)
          .then(function (response) {
              todoList.removeChild(toDoItem)
          })
          .catch(function (error) {
              todoError(error.message)
          })
  }
}

function registerListEvents() {
  todoList.querySelectorAll('.lists-container .icon-remove').forEach(function(item) {
      item.addEventListener('click', removeItem)
  })
}

function removeListEvents() {
  todoList.querySelectorAll('.lists-container .icon-remove').forEach(function(item) {
      item.removeEventListener('click', removeItem)
  })
}

function toggleLoading() {
  loading.classList.toggle('hidden')
}

function todoError(message) {
  error.innerHTML = message
  error.classList.remove('hidden')
}

function initToDoList() {
  loadToDoList()

  const form = document.querySelector('#todo-form')
  const input = form.querySelector('input')

  form.addEventListener('submit', function(e) {
    e.preventDefault()

    addToDo({
      'item': input.value.trim(),
      'done': false,
      'order': 0
    })
  })
}

export default initToDoList