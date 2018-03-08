import './bootstrap'
import datepicker from './modules/datepicker'
import sortable from './modules/sortable'
import showFileNames from './modules/showFileName'
import calendar from './modules/calendar'

$('[data-toggle="tooltip"]').tooltip()
// import './todo-list'
import initToDoList from './modules/todoList'
initToDoList()

// Enable boostrap dropdowns
$('.dropdown-toggle').dropdown()
datepicker()
sortable()
showFileNames()
calendar()