let express = require("express");
let router = express.Router();

let myDB = require("../db/myDB.js");

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

router.post("/register", async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const pwd = req.body.pwd;
    console.log(req.body)
    const msg = await myDB.registerUser(firstName, lastName, email, pwd);
    if (msg === "success") {
      res.redirect("/");
    } else {
      res.status(409).send({register: msg});
    }
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({ err: e });
  }
});

router.get("/create/workout",(req, res) => {
  res.redirect("/create-workout.html");
});


module.exports = router;