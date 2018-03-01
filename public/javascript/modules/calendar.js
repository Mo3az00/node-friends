import { duration } from "moment";

function calenderFunction () {
  $('.calendar').fullCalendar({
    events: '/javascript/data/calendar.json',
    contentHeight: 300,
    handleWindowResize: true,
    defaultView: 'listMonth',
      header: {
        left: 'promptResource prev,next,today',
        center: 'title',
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
          var title = prompt('Enter Event');
          if (title) {
            $('.calendar').fullCalendar(
              'addResource',
              { title: title },
              true // scroll to the new resource?
            );
          }
        }
      }
    },
    resourceLabelText: 'Events',
    resources: [
      { id: 'Event', title: 'Event 1' },
    ],
    
  })
};

export default calenderFunction