const type = document.getElementById("Input-Edit-Type");
const date = document.getElementById("Input-Edit-Date");
const time = document.getElementById("Input-Edit-Time");
const notes = document.getElementById("Input-Edit-Notes");
const duration = document.getElementById("Input-Edit-Duration");

async function workoutDetails() {
  const resRaw = await fetch("/get/workout/data");
  const res = await resRaw.json();
  type.value = res.workout.type;
  date.value = res.workout.date;
  time.value = res.workout.time;
  notes.value = res.workout.note;
  duration.value = res.workout.duration;
}

async function userLogout() {
  const resRaw = await fetch("userLogout");
  if(resRaw.status == 401) {
    window.location.assign("/logIn.html");
  }
}

workoutDetails();