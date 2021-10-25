const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const router = express.Router();

/* MONGODB CLIENT 
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "calendarproject";
const client = new MongoClient(url);
 MONGDB END PRIMER PART */

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

/* MONGODB CONNECTION 
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
})

MONGODB CLOSE CONNECTION */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
