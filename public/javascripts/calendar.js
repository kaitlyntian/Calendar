let calendarEl;
let calendar;

/* Loader for calendar, creates calendar on dashboard */
document.addEventListener("DOMContentLoaded", function() {
  calendarEl = document.getElementById("calendar");

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: "2021-10-07",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    events: [
      {
        title: "All Day Event",
        start: "2021-10-01"
      },
    ]
  });

  /* Add Calendar events from loadFiles function.  Events based on workouts */
  function renderFileCalendar(file){
    calendar.addEvent({
      title: file.type,
      start: file.date
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