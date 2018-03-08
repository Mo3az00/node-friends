import './bootstrap'
import datepicker from './modules/datepicker'
import sortable from './modules/sortable'
import showFileNames from './modules/showFileName'

// import './todo-list'
import initToDoList from './modules/todoList'
initToDoList()

// Enable boostrap dropdowns
$('[data-toggle="tooltip"]').tooltip()
$('.dropdown-toggle').dropdown()
datepicker()
sortable()
showFileNames()
