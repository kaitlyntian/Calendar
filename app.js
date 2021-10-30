let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let session = require("express-session");
let bodyParser= require("body-parser");
let cors = require("cors");

let indexRouter = require("./routes/index");


let app = express();

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "info for calendar project",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", indexRouter);

module.exports = app;