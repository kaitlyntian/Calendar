const divFiles = document.querySelector(".workouts");
const userName = document.getElementById("userName");

/* 
Appends data from files grabbed to html block .workouts
Checks if workout has been finished or not    
*/
function renderFile(file) {

  const divFile = document.createElement("div");

  if(file.finish == "Yes") {
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
  }
  else if (file.finish == "No") {
    divFile.innerHTML = `
    <div class="card card-dashboard">
      <h5 class="card-header text-center">${file.type}</h5>
      <div class="card-body">
        <h5 class="incompleted card-title">Finish Exercise: ${file.finish}</h5>
        <p class = "card-text">${file.notes}</p>
        <p class="card-text">Date: ${file.date}</p>
        <p class="card-text">Time: ${file.time}</p>
        <a href="/edit/workout/${file._id}" class="btn btn-primary btn-dashboard">Edit</a>
        <form onsubmit="completeWorkout(event)">
          <input type = "hidden" name = "completed" value = "${file._id}" id = "complete-workout">
          <button type = "submit" class = "btn btn-primary btn-dashboard">Complete workout?</button>
        </form>
      </div>
    </div>
    `;
  }
  divFiles.appendChild(divFile);
}
/* 
Grabs files from database, data is grabbed from workouts, and user data
helps render username to html, as well as workout cards
*/
async function loadFiles() {
  divFiles.innerHTML = "";
  const resRaw = await fetch("/user/dashboard");
  const res = await resRaw.json();
  userName.innerHTML = res.user;
  res.files.forEach(renderFile);
}
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

async function completeWorkout(event) {
  event.preventDefault();
  let completed = document.getElementById("complete-workout");
  const data = {
    id: completed.value
  };
  const options = {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  };
  const rawData = await fetch("/complete/workout", options, {credentials: "include"});
  if (rawData.status === 200) {
    window.location.assign("/dashboard");
  } else {
    alert("Something's Wrong, please try again");
  }
}

loadFiles();
