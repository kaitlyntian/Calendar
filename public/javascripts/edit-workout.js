let type = document.getElementById("Input-Edit-Type");
let date = document.getElementById("Input-Edit-Date");
let time = document.getElementById("Input-Edit-Time");
let notes = document.getElementById("Input-Edit-Notes");
let duration = document.getElementById("Input-Edit-Duration");
let id;

async function workoutDetails() {
  const resRaw = await fetch("/get/workout/data");
  const res = await resRaw.json();
  console.log(res);
  type.value = res.workout.type;
  date.value = res.workout.date;
  time.value = res.workout.time;
  notes.value = res.workout.notes;
  duration.value = res.workout.duration;
  id = res.workout._id;
}

async function editWorkout(event) {
  event.preventDefault();
  type = document.getElementById("Input-Edit-Type");
  date = document.getElementById("Input-Edit-Date");
  time = document.getElementById("Input-Edit-Time");
  notes = document.getElementById("Input-Edit-Notes");
  duration = document.getElementById("Input-Edit-Duration");

  const data = {
    _id: id,
    type: type.value,
    date: date.value,
    time: time.value,
    duration: duration.value,
    notes: notes.value,
  };

  const rawData = await fetch("/edit/workout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (rawData.status == 200) {
    window.location.assign("dashboard.html");
  } else {
    alert("Something's wrong, please try again");
  }
}

async function userLogout(event) {
  event.preventDefault();
  const resRaw = await fetch("/userLogout");
  const res = await resRaw.json();
  if (res.logout === "success") {
    window.location.assign("logIn.html");
  }
}

workoutDetails();