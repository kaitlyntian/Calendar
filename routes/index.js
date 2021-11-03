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
    res.send({ files: arrangement, user: userData },);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({err: e});
  }
});

/* GET EDIT WORKOUT PAGE */
router.get("/edit/workout/:id", async(req, res) => {
  const intId = parseInt(req.params.id);
  req.session.workout = await myDB.getWorkout(intId);
  res.redirect("/edit-workout.html");
});

/* GET EDIT WORKOUT DATA */
router.get("/get/workout/data", auth, async(req, res) => {
  try {
    let workout = req.session.workout;
    res.send({workout: workout});
  } catch(e) {
    console.log("Error", e);
    res.status(400).send({err: e});
  }
});
/* LOGOUT */
router.get("userLogout", auth, async(req, res) => {
  try {
    delete req.session.email;
    delete req.session.workout;
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
    const msg = await myDB.registerUser(req.body);
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
    const email = req.session.email;
    const msg = await myDB.createWorkout(email, req.body);
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