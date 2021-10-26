let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", (req, res) => {
  res.redirect("/register.html");
});

router.get("/login", (req, res) => {
  res.redirect("/login.html");
});

module.exports = router;