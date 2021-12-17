const divFiles = document.querySelector(".workouts");
const userName = document.getElementById("userName");
let calendarEl;
let calendar;

/* 
Appends data from files grabbed to html block .workouts
Checks if workout has been finished or not    
*/
function renderFile(file) {
  const divFile = document.createElement("div");

  if (file.finish == "Yes") {
    divFile.innerHTML = `
    <div class="card card-dashboard">
      <h5 class="card-header text-center">${file.type}</h5>
      <div class="card-body">
        <h5 class="completed card-title">Finish Exercise: ${file.finish}</h5>
        <p class = "card-text">${file.notes}</p>
        <p class="card-text">Date: ${file.date}</p>
        <p class="card-text">Time: ${file.time}</p>
        <a href="/edit/workout/${file._id}" class="btn btn-primary btn-dashboard">Edit</a>
      </div>
    </div>
    `;
  } else if (file.finish == "No") {
    divFile.innerHTML = `
    <div class="card card-dashboard">
      <h5 class="card-header text-center">${file.type}</h5>
      <div class="card-body">
        <h5 class="incompleted card-title">Finish Exercise: ${file.finish}</h5>
        <p class = "card-text">${file.notes}</p>
        <p class="card-text">Date: ${file.date}</p>
        <p class="card-text">Time: ${file.time}</p>
        <a href="/edit/workout/${file._id}" class="btn btn-primary btn-dashboard">Edit</a>
        <form action = "/complete" method = "POST">
          <input type = "hidden" name = "completed" value = "${file._id}">
          <button type = "submit" class = "btn btn-primary btn-dashboard">Complete workout?</button>
        </form>
      </div>
    </div>
    `;
  }
  divFiles.appendChild(divFile);
}

/* Loader for calendar, creates calendar on dashboard */
document.addEventListener("DOMContentLoaded", function () {
  calendarEl = document.getElementById("calendar");

  calendar = new FullCalendar.Calendar(calendarEl, {
    eventClick: function (info) {
      /* FORMAT TIME */
      function formatAMPM(date) {
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
      if (eventObj.url) {
        let result = confirm(
          "Workout: " +
            eventObj.title +
            "\n" +
            "Start time: " +
            formatAMPM(eventObj.start) +
            "\n" +
            "End Time: " +
            formatAMPM(eventObj.end)
        );
        if (result) {
          window.open(eventObj.url);
        }
      }
    },
    initialView: "dayGridMonth",
    initialDate: "2021-11-01",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: [],
    height: 650,
  });

  /* Add Calendar events from loadFiles function.  Events based on workouts */
  function renderFileCalendar(file) {
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

  /*Get data from the dababase and show them in html page*/
  async function loadFiles() {
    divFiles.innerHTML = "";
    const resRaw = await fetch("/user/dashboard");
    const res = await resRaw.json();
    userName.innerHTML = res.user;
    res.files.forEach(renderFile);
    res.files.forEach(renderFileCalendar);
  }

  loadFiles();

  calendar.render();
});

/*
Logout function.  Kills session.
*/
async function userLogout(event) {
  event.preventDefault();
  const resRaw = await fetch("/userLogout");
  const res = await resRaw.json();
  if (res.logout === "success") {
    window.location.assign("logIn.html");
  }
}
