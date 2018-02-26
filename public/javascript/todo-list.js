import axios from 'axios'

const buttonAddTodo = document.querySelector('.button-add-todo')
const todoFormNew = document.querySelector('.todo-form-new')
const todoList = document.querySelector('#todo-list-display')
const loading = document.querySelector('#todo-list-loading')
const error = document.querySelector('#todo-list .todo-error')

registerButtonEvent()
registerFormEvent()
loadToDoList()

function loadToDoList() {
    toggleLoading()
    
    axios.get('/todos')
        .then(function (response) {
            buildToDoList(response.data.todos)
            toggleLoading()
        })
        .catch(function (error) {
            todoError(error.message)
            toggleLoading()
        })
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

function buildToDoListItem(todo) {
    return `
        <div class="list-group-item flex-column" data-id="${todo._id}">
            ${todo.text}
            <i class="icon-remove fa fa-remove float-right" title="delete item"></i>
        </div>
    ` 
}

function toggleLoading() {
    loading.classList.toggle('hidden')
}

function addItem(text) {
    if (text.length === 0) {
        return
    }

    axios.post('/todos/add', {
        text
    })
        .then(function (response) {
            const item = buildToDoListItem(response.data.todo)

            removeListEvents()
            todoList.innerHTML += item
            registerListEvents()
        })
        .catch(function (error) {
            todoError(error.message)
        });
}

function removeItem(e) {
    const toDoItem = this.closest('.list-group-item')
    const toDoId = toDoItem.dataset.id
    const confirmed = confirm('Really delete this entry?')

    if (confirmed) {
        axios.get(`/todos/${toDoId}/delete/`)
            .then(function (response) {
                toDoItem.parentElement.removeChild(toDoItem)
            })
            .catch(function (error) {
                todoError(error.message)
            })
    }
}

function registerListEvents() {
    todoList.querySelectorAll('.list-group-item .icon-remove').forEach(function(item) {
        item.addEventListener('click', removeItem)
    })
}

function removeListEvents() {
    todoList.querySelectorAll('.list-group-item .icon-remove').forEach(function(item) {
        item.removeEventListener('click', removeItem)
    })
}

function registerButtonEvent() {
    buttonAddTodo.addEventListener('click', function() {
        console.log('foo')
        todoFormNew.style.display = 'block'
        todoFormNew.querySelector('input').focus()
    
        this.setAttribute('disabled', 'disabled')
    })
}

function registerFormEvent() {
    todoFormNew.addEventListener('submit', function(e) {
        e.preventDefault()
    
        addItem(this.querySelector('[name="text"]').value)
    
        this.querySelector('[name="text"]').value = ''
        this.style.display = 'none'
        buttonAddTodo.removeAttribute('disabled')
    })
}

function todoError(message) {
    error.innerHTML = message
    error.classList.remove('hidden')
}
