import './bootstrap'
import datepicker from './modules/datepicker'

// This is needed for the ToDo List demo
import './todo-list'

// Enable bootstrap dropdowns
$('.dropdown-toggle').dropdown()

// Enable bootstrap dropdowns with hover effect
import dropDownHover from './dropdown-hover'
dropDownHover('.dropdown-hover')

$('.dropdown-toggle').dropdown()

// Load date range pickers
datepicker()
