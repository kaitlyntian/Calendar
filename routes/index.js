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
  //console.log(req);
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const pwd = req.body.pwd;
    
    const msg = await myDB.registerUser(firstName, lastName, email, pwd);
    if (msg === "success") {
      //res.sendStatus(200);
      res.redirect("logIn.html");
    } else {
      res.status(409).send({register: msg});
    }
  } catch (e) {
    res.status(400).send({ err: e });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email_login;
    const pwd = req.body.pwd_login;

    const msg = await myDB.userLogin(email, pwd);
    if (msg === "success") {
      res.redirect("/");
    } else {
      res.status(409).send({login : msg});
    }
  } catch (e) {
    res.status(400).send({ err: e });
  }
});

router.get("/create/workout",(req, res) => {
  res.redirect("/create-workout.html");
});

module.exports = router;