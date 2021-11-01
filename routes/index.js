let express = require("express");
let router = express.Router();

let myDB = require("../db/myDB.js");

const auth = (req, res, next) => {
  if (!req.session.email) {
    return res.redirect("/logIn.html");
  }
  next();
};

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/register", (req, res) => {
  res.redirect("/register.html");
});

router.get("/login", (req, res) => {
  res.redirect("/logIn.html");
});

router.post("/register", async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const email = req.body.email;
    const pwd = req.body.pwd;
    
    const msg = await myDB.registerUser(firstName, lastName, userName, email, pwd);
    if (msg === "success") {
      res.sendStatus(200);
    } else {
      res.status(409).send({register: msg});
    }
  } catch (e) {
    res.status(400).send({ err: e });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const pwd = req.body.pwd;

    const msg = await myDB.userLogin(email, pwd);
    if (msg === "success") {
      req.session.email = email;
      res.sendStatus(200);
    } else {
      res.status(409).send({login : msg});
    }
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({ err: e });
  }
});

router.get("/create/workout", auth, (req, res) => {
  res.redirect("/create-workout.html");
});

router.post("/create/workout", auth, async (req, res) => {
  try {
    const type = req.body.type;
    const date = req.body.date;
    const time = req.body.time;
    const duration = req.body.duration;
    const notes = req.body.notes;
    const email = req.session.email;
    console.log(email);
    
    const msg = await myDB.createWorkout(email, type, date, time, duration, notes);
    if (msg === "success") {
      res.sendStatus(200);
    } else {
      res.status(409).send({createWorkout: msg});
    }
  } catch (e) {
    res.status(400).send({ err: e });
  }
});

router.get("/user/dashboard", auth, async(req, res) => {
  try {
    let email = req.session.email;
    const arrangement = await myDB.getData(email);
    const userData = await myDB.getUserData(email);
    console.log(userData);
    res.send({ files: arrangement, user: userData },);
    //res.redirect("/dashboard.html");
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({err: e});
  }
});

module.exports = router;