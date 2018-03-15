import './bootstrap'
import contactForm from './modules/contactForm'
import initToDoList from './modules/todoList'
import datepicker from './modules/datepicker'
import sortable from './modules/sortable'
import showFileNames from './modules/showFileName'
import calendar from './modules/calendar'

contactForm()

if (window.location.href.includes('admin')) {
  $('[data-toggle="tooltip"]').tooltip()

  initToDoList()

  // Enable boostrap dropdowns
  $('.dropdown-toggle').dropdown()
  datepicker()
  sortable()
  showFileNames()
  calendar()
}