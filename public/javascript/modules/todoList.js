import axios from 'axios'

const elements = {
  todoList: document.querySelector('#todo-list'),
  loading: null,
  form: null,
  error: null,
  input: null
}

function addToDo (todo) {
  if (todo.item.length === 0) {
    todoError('Please supply a text for your item!')
    return
  }

  elements.error.classList.add('hidden')

  axios
    .post('/admin/todos/add', todo)
    .then((response) => {
      removeListEvents()
      elements.todoList.innerHTML += buildToDoListItem(response.data)
      registerListEvents()
      elements.input.value = ''
    })
    .catch((error) => {
      console.error(error)
    })
}

function loadToDoList () {
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

function buildToDoListItem (todo) {
  return `
  <tr class="lists-container" data-id="${todo._id}">
    <td>
      <i class="fa fa-bars sortable-handle" aria-hidden="true"></i>
    </td>
    <td class="col-1 text-left">
      <div class="custom-control custom-checkbox text-left">
        <input class="custom-control-input checkbox" value="1" id="todo-${todo._id}" type="checkbox" ${todo.done ? 'checked' : ''}>
        <label class="custom-control-label ${todo.done ? 'done' : ''}" for="todo-${todo._id}">${todo.item}</label>
      </div>
    </td>
    <td class="text-right">
      <i class="icon-remove fa fa-remove"></i>
    </td>
  </tr>
  `
}

function buildToDoList (todos) {
  let markup = ''

  if (todos.length !== 0) {
    markup = todos.map((todo) => {
      return buildToDoListItem(todo)
    }).join('')
  }

  elements.todoList.innerHTML = markup
  registerListEvents()
}

function removeItem (e) {
  const toDoItem = this.closest('.lists-container')
  const toDoId = toDoItem.dataset.id
  const confirmed = window.confirm('Really delete this entry?')

  if (confirmed) {
    axios.get(`/admin/todos/${toDoId}/delete/`)
      .then(function (response) {
        elements.todoList.removeChild(toDoItem)
      })
      .catch(function (error) {
        todoError(error.message)
      })
  }
}

function toggleDone (e) {
  const toDoId = this.closest('.lists-container').getAttribute('data-id')
  this.setAttribute('disabled', 'disabled')

  if (this.checked) {
    this.parentElement.querySelector('label').classList.add('done')
  } else {
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
    .catch(() => {
      this.removeAttribute('disabled')
    })
}

function registerListEvents () {
  elements.todoList.querySelectorAll('.lists-container .icon-remove').forEach(function (item) {
    item.addEventListener('click', removeItem)
  })

  elements.todoList.querySelectorAll('.lists-container .checkbox').forEach(function (item) {
    item.addEventListener('click', toggleDone)
  })
}

function removeListEvents () {
  elements.todoList.querySelectorAll('.lists-container .icon-remove').forEach(function (item) {
    item.removeEventListener('click', removeItem)
  })
}

function toggleLoading () {
  elements.loading.classList.toggle('hidden')
}

function todoError (message) {
  elements.error.innerHTML = message
  elements.error.classList.remove('hidden')
}

function getElements () {
  elements.loading = document.querySelector('#todo-list-loading')
  elements.form = document.querySelector('#todo-form')
  elements.error = document.querySelector('#todo-list-error')
  elements.input = elements.form.querySelector('input')
}

function initToDoList () {
  if (!elements.todoList) {
    return false
  }

  getElements()
  loadToDoList()

  elements.form.addEventListener('submit', function (e) {
    e.preventDefault()

    addToDo({
      'item': elements.input.value.trim(),
      'done': false
    })
  })
}

export default initToDoList
