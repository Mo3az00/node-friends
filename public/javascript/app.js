import './bootstrap'

// import './todo-list'
import initToDoList from './modules/todoList'
initToDoList()

// Enable boostrap dropdowns
$('.dropdown-toggle').dropdown()

// Dashboard calendar
import calendar from './modules/calendar'
calendar()