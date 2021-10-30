const type = document.getElementById("Input-Type");
const date = document.getElementById("Input-Date");
const time = document.getElementById("Input-Time");
const notes = document.getElementById("Input-Notes");

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
    window.location.assign("/user/dashboard");
  } else {
    alert("Something's wrong, please try again");
  }
}
