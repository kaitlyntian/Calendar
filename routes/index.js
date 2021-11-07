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
  res.header("Access-Control-Allow-Origin", "*");
  try {
    console.log("email in index.js: ", req.session.email);
    const arrangement = await myDB.getData(req.session.email);
    res.send({ files: arrangement, user: req.session.userName },);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({err: e});
  }
});

router.get("/dashboard", auth, (req, res) => {
  res.redirect("dashboard.html");
});

/* GET EDIT WORKOUT PAGE */
router.get("/edit/workout/:id", async(req, res) => {
  const intId = req.params.id;
  req.session.wortoutId = intId;
  req.session.workout = await myDB.getWorkout(intId);
  res.redirect("/edit-workout.html");
});

/* GET EDIT WORKOUT DATA */
router.get("/get/workout/data", auth, async(req, res) => {
  try {
    res.send({workout: req.session.workout});
  } catch(e) {
    console.log("Error", e);
    res.status(400).send({err: e});
  }
});
/* LOGOUT */
router.get("/userLogout", async(req, res) => {
  try {
    req.session.destroy();
    res.send({logout: "success"});
  } catch(e) {
    console.error("Error", e);
    res.status(400).send({err: e});
  }
});

router.get("/deleteWorkout", auth, async(req, res) => {
  try {
    const intId = req.session.wortoutId;
    console.log("id in index.js: ", intId);
    const msg = await myDB.deleteWorkout(intId);
    if (msg === "success") {
      res.send({delete: "success"});
    }
    req.session.wortoutId = "";
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({err: e});
  }
});

router.get("/userData", auth, async(req, res) => {
  try {
    const user = await myDB.getUserData(req.session.email);
    const finishedTime = await myDB.countFinished(req.session.email);
    res.send({userInfo: user, finishedTime: finishedTime});
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({err: e});
  }
}); 

/* CHECK SESSION */ //WORK IN PROGRESS TO UPDATE NAV BAR ON SESSION

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
    if (msg[0] === "success") {
      req.session.email = email;
      req.session.userName = msg[1];
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

router.post("/edit/workout", auth, async(req, res) => {
  try {
    const msg = await myDB.editWorkout(req.body);
    if (msg === "success") {
      res.sendStatus(200);
    }
    req.session.wortoutId = "";
  } catch(e) {
    res.status(400).send({ err: e });
  }
});

router.post("/complete", auth, async(req, res) => {
  try{
    const msg = await myDB.completeWorkout(req.body);
    //console.log("Req body completed value: ", req.body.completed);
    //let msg = "success";
    if( msg === "success") {
      res.redirect("dashboard.html");
    } 
  }catch(e) {
    res.status(400).send({err:e});
  }
});



/*****************
END POST ROUTES 
******************/

module.exports = router;