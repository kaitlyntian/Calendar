let calendarEl;
let calendar;

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

  function renderFileCalendar(file){
    console.log(calendar);
    calendar.addEvent({
      title: file.type,
      start: file.date
    });
  }

  async function loadFiles() {
    const resRaw = await fetch("/user/dashboard");
    const res = await resRaw.json();
    res.files.forEach(renderFileCalendar);
  }

  loadFiles();

  calendar.render();
});