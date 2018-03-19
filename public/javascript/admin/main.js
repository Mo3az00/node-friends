// node modules
import 'bootstrap'
import 'bootstrap-datepicker'

// styles
import '../../sass/admin/main.scss'

// own modules
import datepicker from '../modules/datepicker'
import sortable from '../modules/sortable'
import showFileNames from '../modules/showFileName'

// run scripts
$('[data-toggle="tooltip"]').tooltip()
$('.dropdown-toggle').dropdown()

datepicker()
sortable()
showFileNames()