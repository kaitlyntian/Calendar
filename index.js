const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const router = express.Router();

app.use(express.static(__dirname + "/public"));

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

router.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname+"/public/login.html"));
});

router.get("/register", function(req, res) {
  res.sendFile(path.join(__dirname+"/public/register.html"));
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
