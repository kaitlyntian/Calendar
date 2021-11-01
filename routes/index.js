let express = require("express");
let router = express.Router();

let myDB = require("../db/myDB.js");

/* AUTHENTICATE USER */
const auth = (req, res, next) => {
  if (!req.session.email) {
    return res.redirect("/logIn.html");
  }
  next();
};

/*****************
GET ROUTES 
******************/

/* GET HOME PAGE */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});
/* GET REGISTER PAGE */
router.get("/register", (req, res) => {
  res.redirect("/register.html");
});
/* GET LOGIN PAGE */
router.get("/login", (req, res) => {
  res.redirect("/logIn.html");
});
/* GET WORKOUTS CREATION PAGE */
router.get("/create/workout", auth, (req, res) => {
  res.redirect("/create-workout.html");
});
/* GET DASHBOARD */
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
/* LOGOUT */
router.get("userLogout", auth, async(req, res) => {
  try {
    delete req.session.email;
  } catch(e) {
    console.error("Error", e);
    res.status(400).send({err: e});
  }
});

/*****************
END GET ROUTES 
******************/


/*****************
POST ROUTES 
******************/

/* REGISTER USER */
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
/* LOGIN USER */
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
/* CREATE WORKOUT */
router.post("/create/workout", auth, async (req, res) => {
  try {
    const type = req.body.type;
    const date = req.body.date;
    const time = req.body.time;
    const duration = req.body.duration;
    const note = req.body.notes;
    const email = req.session.email;
    console.log(email);
    
    const msg = await myDB.createWorkout(email, type, date, time, duration, note);
    if (msg === "success") {
      res.sendStatus(200);
    } else {
      res.status(409).send({createWorkout: msg});
    }
  } catch (e) {
    res.status(400).send({ err: e });
  }
});

/*****************
END POST ROUTES 
******************/

module.exports = router;