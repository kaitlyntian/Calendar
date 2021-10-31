const divFiles = document.querySelector(".workouts");

function renderFile(file) {
  const divFile = document.createElement("div");
  divFile.innerHTML = `
  <div class="card card-dashboard">
    <h5 class="card-header text-center">${file.type}</h5>
    <div class="card-body">
      <h5 class="upcoming card-title">Finish Exercise: ${file.finish}</h5>
      <p class = "card-text">${file.note}</p>
      <p class="card-text">Date: ${file.date}</p>
      <p class="card-text">Time: ${file.time}</p>
      <a href="#" class="btn btn-primary btn-dashboard">Edit</a>
    </div>
  </div>
  `;
  divFiles.appendChild(divFile);
}

async function loadFiles() {
  divFiles.innerHTML = "";
  const resRaw = await fetch("/user/dashboard");
  const res = await resRaw.json();
  res.files.forEach(renderFile);
}

loadFiles();