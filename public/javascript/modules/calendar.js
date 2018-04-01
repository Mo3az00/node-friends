import 'fullcalendar'

function calendarFunction () {
  $('.calendar').fullCalendar({
    events: '/javascript/data/calendar.json',
    contentHeight: 400,
    handleWindowResize: true,
    defaultView: 'listMonth',
    titleFormat: 'MMM YYYY',
    header: {
      left: 'prev,next,today',
      center: '',
      right: 'title'
    },
    footer: {
      right: 'agendaWeek,month,listMonth'
    },
    navLinks: true,
    weekends: true,
    minTime: '09:00:00',
    maxTime: '16:15:00',
    eventBackgroundColor: '#D0E0E3',
    eventRender: function (event, element) {
      if (event.description) {
        element
          .attr('data-toggle', 'tooltip')
          .attr('data-placement', 'top')
          .attr('data-html', 'true')
          .attr('data-container', 'body')
          .attr('data-boundary', 'viewport')
          .attr('data-title', event.description)
          .tooltip()
      }
    },
    eventClick: function (event, element) {
      // console.log(event)
    }
  })
}
export default calendarFunction
