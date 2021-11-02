const divFiles = document.querySelector(".workouts");
const userName = document.getElementById("userName");

/* 
Appends data from files grabbed to html block .workouts
Checks if workout has been finished or not    
*/
function renderFile(file) {

  const divFile = document.createElement("div");

  if(file.finish == "yes") {
    divFile.innerHTML = `
    <div class="card card-dashboard">
      <h5 class="card-header text-center">${file.type}</h5>
      <div class="card-body">
        <h5 class="completed card-title">Finish Exercise: ${file.finish}</h5>
        <p class = "card-text">${file.note}</p>
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
        <p class = "card-text">${file.note}</p>
        <p class="card-text">Date: ${file.date}</p>
        <p class="card-text">Time: ${file.time}</p>
        <a href="/edit/workout/${file._id}" class="btn btn-primary btn-dashboard">Edit</a>
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
  userName.innerHTML = res.user.userName;
  res.files.forEach(renderFile);

}
/*
Logout function.  Kills session.
*/
async function userLogout() {
  const resRaw = await fetch("userLogout");
  if (resRaw.status === 401) {
    window.location.assign("/logIn.html");
  }
}

loadFiles();
