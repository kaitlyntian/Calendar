const type = document.getElementById("Input-Type");
const date = document.getElementById("Input-Date");
const time = document.getElementById("Input-Time");
const notes = document.getElementById("Input-Notes");
const duration = document.getElementById("Input-Duration");

/*
Checks form data for valid inputs, then passes data to server
*/
async function createWorkout(event) {
  event.preventDefault();
  
  if (type.value === "Choose Workout") {
    alert("Please select the exercise type");
    return;
  }
  if (date.value.length === 0 || time.value.length === 0) {
    alert("Please select the date and time to do exercise");
    return;
  }
  if (duration.value === "Choose Time") {
    alert("Please select the duration of this exercise");
    return;
  }

  const data = {
    type: type.value,
    date: date.value,
    time: time.value,
    duration: duration.value,
    notes: notes.value,
  };
  const options = {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  };
  const rawData = await fetch("/create/workout", options, {credentials: "include"});
  if (rawData.status === 200) {
    window.location.assign("dashboard.html");
  } else {
    alert("Something's wrong, please try again");
  }
}

/* Logout function.  Kills session.*/
async function userLogout(event) {
  event.preventDefault();
  const resRaw = await fetch("/userLogout");
  const res = await resRaw.json();
  if (res.logout === "success") {
    window.location.assign("logIn.html");
  }
}