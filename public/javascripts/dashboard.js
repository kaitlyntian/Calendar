const divFiles = document.querySelector("#files");

function renderFile(file) {
  
}

async function loadFiles() {
  divFiles.innerHTML = "";
  const resRaw = await fetch("/user/dashboard");
  const res = await resRaw.json();
  res.files.forEach(renderFile);
}