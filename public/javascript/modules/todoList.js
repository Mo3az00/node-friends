import axios from 'axios'

const todoList = document.querySelector('#todo-list')
const loading = document.querySelector('#todo-list-loading')
const form = document.querySelector('#todo-form')
const error = document.querySelector('#todo-list-error')
const input = form.querySelector('input')

function addToDo (todo) {
  if (todo.item.length === 0) {
    todoError('Please supply a text for your item!')
    return
  }

  error.classList.add('hidden')

  axios
    .post('/admin/todos/add', todo)
    .then((response) => {
      removeListEvents()
      todoList.innerHTML += buildToDoListItem(response.data)
      registerListEvents()
      input.value = ''
      
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
  <div class="lists-container container p-0 px-2" data-id="${todo._id}">
    <button class="btn btn-sm p-0 mr-2" type="button" id="move-todolist">
      <i class="fa fa-arrows" aria-hidden="true"></i>
    </button>
    <div class="custom-control custom-checkbox d-inline-flex">
      <input class="custom-control-input checkbox" value="1" id="todo-${todo._id}" type="checkbox" ${todo.done ? 'checked' : ''}>
      <label class="custom-control-label ${todo.done ? 'done' : ''}" for="todo-${todo._id}">${todo.item}</label>
    </div>
    <i class="icon-remove fa fa-remove my-auto float-right"></i>
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

function toggleDone(e) {
  const toDoId = this.closest('.lists-container').getAttribute('data-id')
  this.setAttribute('disabled', 'disabled')

  if (this.checked) {
    this.parentElement.querySelector('label').classList.add('done')
  }
  else {
    this.parentElement.querySelector('label').classList.remove('done')
  }

  axios
    .post('/admin/todos/update-done', {
      id: toDoId,
      done: this.checked
    })
    .then((response) => {
      this.removeAttribute('disabled')
    })
    .catch((error) => {
      this.removeAttribute('disabled')
    })
}

function registerListEvents() {
  todoList.querySelectorAll('.lists-container .icon-remove').forEach(function(item) {
      item.addEventListener('click', removeItem)
  })

  todoList.querySelectorAll('.lists-container .checkbox').forEach(function(item) {
    item.addEventListener('click', toggleDone)
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

  form.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log('submitted', input.value)

    addToDo({
      'item': input.value.trim(),
      'done': false,
    })
  })
}

export default initToDoList