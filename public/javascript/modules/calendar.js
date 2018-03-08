import { duration } from "moment";

function calendarFunction () {
  $('.calendar').fullCalendar({
    events: '/javascript/data/calendar.json',
    contentHeight: 300,
    handleWindowResize: true,
    defaultView: 'listMonth',
    titleFormat: 'MMM YYYY',
    header: {
      left: 'addEventButton, prev,next,today',
      center: '',
      right: 'title'
    },
    footer: {
      right: 'agendaWeek,listMonth'
    },
    navLinks: true,
    weekends: true,
    minTime: "09:00:00",
    maxTime: "16:15:00",

    eventClick: function(event, element) {

      event.title = "CLICKED!";

      $('.calendar').fullCalendar('updateEvent', event);

    },
      customButtons: {
        promptResource: {
          text: '+ Event',
          click: function() {
            const title = prompt('Enter Event');
            if (title) {
              $('.calendar').fullCalendar('addEventSource',
                { title: title },
                true // scroll to the new resource?
              );
            }
          }
        }
      }
    })

}
export default calendarFunction