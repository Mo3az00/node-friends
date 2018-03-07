import './bootstrap'
import datepicker from './modules/datepicker'
import sortable from './modules/sortable'
import showFileNames from './modules/showFileName'

$('[data-toggle="tooltip"]').tooltip()
$('.dropdown-toggle').dropdown()
datepicker()
sortable()
showFileNames()