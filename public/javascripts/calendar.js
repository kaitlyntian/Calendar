let calendarEl;
let calendar;

/* Loader for calendar, creates calendar on dashboard */
document.addEventListener("DOMContentLoaded", function() {
  calendarEl = document.getElementById("calendar");

  calendar = new FullCalendar.Calendar(calendarEl, {
    eventClick: function(info) {
      /* FORMAT TIME */
      function formatAMPM(date){
        let hours = date.getHours();
        let mins = date.getMinutes();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        mins = mins < 10 ? "0" + mins : mins;
        let strTime = hours + ":" + mins + " " + ampm;
        return strTime;
      }
      /* END FORMAT TIME */
      let eventObj = info.event;
      info.jsEvent.preventDefault();
      if(eventObj.url) {
        let result = confirm("Workout: " + eventObj.title + "\n" +
          "Start time: " + formatAMPM(eventObj.start) + "\n" +
          "End Time: " + formatAMPM(eventObj.end) + "\n" +
          "Would you like to edit this workout?");
        if(result){
          window.open(eventObj.url);
        }
      }
    },
    initialView: "dayGridMonth",
    initialDate: "2021-10-07",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    events: [

    ]
  });

  /* Add Calendar events from loadFiles function.  Events based on workouts */
  function renderFileCalendar(file){
    let eventStart = file.date + "T" + file.time;
    let eventEnd = new Date(eventStart);
    eventEnd.setMinutes(eventEnd.getMinutes() + parseInt(file.duration));
    calendar.addEvent({
      title: file.type,
      start: eventStart,
      end: eventEnd,
      duration: file.duration,
      backgroundColor: "#2C3E50",
      url: "/edit/workout/" + file._id,
    });
  }

  /* Loader functions, grabs data from dummy database for calendar */
  async function loadFiles() {
    const resRaw = await fetch("/user/dashboard");
    const res = await resRaw.json();
    res.files.forEach(renderFileCalendar);
  }

  loadFiles();

  calendar.render();
});