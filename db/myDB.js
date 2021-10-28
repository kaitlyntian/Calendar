/*//MONGODB CLIENT
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "calendar";
const client = new MongoClient(url);

// MONGODB CONNECTION
client.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    //callback && callback(db)
    client.close();
  }
});
*/
let users = [
  { firstName: "Jennifer", lastName: "Xiao", email: "123@gmail.com", pwd: "123456"}];

async function registerUser(firstName, lastName, email, pwd) {
  console.log(users);
  const existUser = users.includes(email);
  if (existUser) {
    return "The email exists, please use another email address";
  }
  const newData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    pwd: pwd
  };
  users.push(newData);
  console.log("user info:", users);
  return "success";
}

module.exports = {
  registerUser
};