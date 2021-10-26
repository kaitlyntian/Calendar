let express = require("express");
let router = express.Router();

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

router.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname+"/public/login.html"));
});

router.get("/register", function(req, res) {
  res.sendFile(path.join(__dirname+"/public/register.html"));
});

module.exports = router;