/*
MONGODB CLIENT -> KEEP FOR WHEN U?SING MONGODB
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

/* DUMMY DATA */
let users = [
  { firstName: "Jennifer", lastName: "Xiao", userName: "Jenn", email: "123@gmail.com", pwd: "123456"}];

let arrangements = [
  {email: "123@gmail.com", date: "2021-10-24", time: "18:00:00", duration: "15", type: "Yoga", finish: "yes", note: ""},
  {email: "123@gmail.com", date: "2021-10-28", time: "18:00:00", duration: "30", type: "Cardio", finish: "No", note: ""},
  {email: "123@gmail.com", date: "2021-10-29", time: "18:00:00", duration: "60", type: "Yoga", finish: "No", note: "Test note"},
  {email: "123@gmail.com", date: "2021-11-5", time: "18:00:00", duration: "90", type: "Go to Gym", finish: "No", note: "Testing"}];

/* END DUMMY DATA */

/* CHECK FOR OF USER EXISTS */
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

/* REGISTER NEW USER INTO DB */
function registerUser(firstName, lastName, userName, email, pwd) {
  if (containUser(email)) {
    return "The email exists, please use another email address";
  }
  const newData = {
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    pwd: pwd
  };
  users.push(newData);
  console.log("user info:", users);
  return "success";
}

/* LOGIN USER */
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

/* CREATE WORKOUT TO DB */
function createWorkout(email, type, date, time, duration, note) {
  if (!containUser(email)) {
    return "Sorry, please log in first";
  }
  const newWorkout = { email: email, type: type, date: date, time: time, duration: duration, note: note, finish: "No" };
  arrangements.push(newWorkout);
  console.log("Workout: ", arrangements);
  return "success";
}

/* GRAB DATA FOR WORKOUTS */
function getData(email) {
  if (!containUser(email)) {
    return "Sorry, please log in first";
  }
  let arrangement = [];
  for (let i = 0; i < arrangements.length; i++) {
    if (arrangements[i].email === email) {
      arrangement.push(arrangements[i]);
    }
  }
  let sortedArrangement = arrangement.sort((a, b) => {
    if (a.date > b.date) {return -1;}
    if (a.date < b.date) {return 1;}
    return 0;
  });
  console.log(sortedArrangement);
  return sortedArrangement;
}

/* GET DATA FOR USER */
function getUserData(email) {
  if(!containUser(email)) {
    return "Sorry, please log in first";
  }
  let userData;
  for(let i = 0; i < users.length; i++) {
    if(users[i].email === email) {
      userData = users[i];
    }
  }
  return userData;
}

module.exports = {
  registerUser,
  userLogin,
  createWorkout,
  getData,
  getUserData
};