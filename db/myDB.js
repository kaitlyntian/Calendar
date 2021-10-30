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

let arrangements = [
  {email: "123@gmail.com", startTime: "2021-10-24T16:00:00Z", endTime: "2021-10-29T18:00:00Z", type: "Stretch", finish: "yes", note: ""},
  {email: "123@gmail.com", startTime: "2021-10-28T16:00:00Z", endTime: "2021-10-28T18:00:00Z", type: "Cardio", finish: "No", note: ""},
  {email: "123@gmail.com", startTime: "2021-10-29T16:00:00Z", endTime: "2021-10-29T18:00:00Z", type: "Chest", finish: "No", note: ""},
  {email: "123@gmail.com", startTime: "2021-10-29T16:00:00Z", endTime: "2021-10-29T18:00:00Z", type: "Arms", finish: "No", note: ""}];

function registerUser(firstName, lastName, email, pwd) {
  let existUser = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      existUser = true;
      break;
    }
  }
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

function userLogin(email, pwd) {
  let exist = false;
  let user;
  for (let j = 0; j < users.length; j++) {
    if (users[j].email === email) {
      exist = true;
      user = users[j];
      break;
    }
  }
  if (!exist) {
    return "User not exists, please register first";
  }
  if (user.pwd === pwd) {
    return "success";
  } else {
    return "Wrong password or email address, please try again";
  }
}

module.exports = {
  registerUser,
  userLogin
};