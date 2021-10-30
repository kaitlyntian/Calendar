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
  {email: "123@gmail.com", date: "2021-10-24", time: "18:00:00", type: "Yoga", finish: "yes", note: ""},
  {email: "123@gmail.com", date: "2021-10-28", time: "18:00:00", type: "Cardio", finish: "No", note: ""},
  {email: "123@gmail.com", date: "2021-10-29", time: "18:00:00", type: "Yoga", finish: "No", note: "Test note"},
  {email: "123@gmail.com", date: "2021-11-5", time: "18:00:00", type: "Go to Gym", finish: "No", note: "Testing"}];

function containUser(email) {
  let existUser = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      existUser = true;
      break;
    }
  }
  return existUser;
}

function registerUser(firstName, lastName, email, pwd) {
  if (containUser(email)) {
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

function createWorkout(email, type, date, time, notes) {
  if (!containUser(email)) {
    return "Sorry, please log in first";
  }
  const newWorkout = { email: email, type: type, date: date, time: time, notes: notes };
  arrangements.push(newWorkout);
  console.log("Workout: ", arrangements);
  return "success";
}

module.exports = {
  registerUser,
  userLogin,
  createWorkout
};