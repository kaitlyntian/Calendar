const type = document.getElementById("Input-Edit-Type");
const date = document.getElementById("Input-Edit-Date");
const time = document.getElementById("Input-Edit-Time");
const notes = document.getElementById("Input-Edit-Notes");
const duration = document.getElementById("Input-Edit-Duration");

async function workoutDetails() {
  const resRaw = await fetch("/get/workout/data");
  const res = await resRaw.json();
  console.log(res);
  type.value = res.workout.type;
  date.value = res.workout.date;
  time.value = res.workout.time;
  notes.value = res.workout.notes;
  duration.value = res.workout.duration;
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