import datepicker from 'bootstrap-datepicker'
import moment from 'moment'

const init = function () {
  $('.datepicker').datepicker({
    daysOfWeekDisabled: [0, 7],
    format: 'mm/dd/yyyy',
    language: 'en',
    startDate: 0,
    startView: 'days',
    todayHighlight: true
  })

  $('.input-daterange').each(function () {
    const range = $(this)
    const inputBegin = range.find('[name="date_begin"]')
    const inputEnd = range.find('[name="date_end"]')

    range.datepicker({
      inputs: range.find('input'),
      startDate: moment().format('MM/DD/YYYY')
    })

    inputBegin.datepicker().on('changeDate', function (e) {
      inputEnd.datepicker('setStartDate', e.date)
      inputEnd.datepicker('setDate', e.date)
      $(this).datepicker('hide')
      inputEnd.datepicker('show')
    })
  })
}

export default init
