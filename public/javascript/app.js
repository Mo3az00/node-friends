import './bootstrap'

// import './todo-list'
import initToDoList from './modules/todoList'
initToDoList()

// Enable boostrap dropdowns
$('.dropdown-toggle').dropdown()

// Loading FullCalendar for all .calendar elements
import calendar from './modules/calendar'
calendar()

// Enableing dropdown elements
$('.dropdown-toggle').dropdown()

// Enabling a date range picker
import datepicker from './modules/datepicker'
datepicker()
