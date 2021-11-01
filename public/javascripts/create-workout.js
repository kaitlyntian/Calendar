const type = document.getElementById("Input-Type");
const date = document.getElementById("Input-Date");
const time = document.getElementById("Input-Time");
const notes = document.getElementById("Input-Notes");
const duration = document.getElementById("Input-Duration");

async function createWorkout(event) {
  event.preventDefault();
  console.log("start");
  
  if (type.value.length === 0) {
    alert("Please select the exercise type");
    return;
  }
  if (date.value.length === 0 || time.value.length === 0) {
    alert("Please select the date and time to do exercise");
    return;
  }

  const data = {
    type: type.value,
    date: date.value,
    time: time.value,
    duration: duration.value,
    notes: notes.value,
  };
  console.log(data);
  const options = {
    method: "post",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  };
  const rawData = await fetch("/create/workout", options);
  if (rawData.status == 200) {
    window.location.assign("dashboard.html");
  } else {
    alert("Something's wrong, please try again");
  }
}

async function userLogout() {
  const resRaw = await fetch("userLogout");
  if (resRaw.status === 401) {
    window.location.assign("/login");
  }
}