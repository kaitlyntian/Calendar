/* MONGODB CLIENT 
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "calendarproject";
const client = new MongoClient(url);
 MONGDB END PRIMER PART */

/* MONGODB CONNECTION 
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
})

MONGODB CLOSE CONNECTION */