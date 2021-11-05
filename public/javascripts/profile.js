const userName = document.getElementById("userName");
const divFiles = document.querySelector(".profile");

/* 
Grabs files from database, data is grabbed from workouts, and user data
helps render username to html, as well as workout cards
*/
async function loadFiles() {
  divFiles.innerHTML = "";
  const resRaw = await fetch("/userData");
  const res = await resRaw.json();
  userName.innerHTML = res.userInfo.userName;
  const divFile = document.createElement("div");
  divFile.innerHTML = `
    <div class="card card-dashboard">
      <h5 class="card-header text-center">User Profile</h5>
      <div class="card-body">
        <p class="card-text center">First Name: ${res.userInfo.firstName}</p>
        <p class = "card-text center">Last Name: ${res.userInfo.lastName}</p>
        <p class="card-text center">User Name: ${res.userInfo.userName}</p>
        <p class="card-text center">Email Address: ${res.userInfo.email}</p>
        <p class="card-text center">After joining us, you have finished: <strong>${res.finishedTime}</strong> times workout! Great job!</p>
      </div>
    </div>
    `;
  divFiles.appendChild(divFile);
}

loadFiles();
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