const { MongoClient } = require("mongodb");
const url = process.env.MONGI_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(url, { useUnifiedTopology: true });
const db = client.db("calendar");
const users = db.collection("users");
const arrangements = db.collection("arrangements");

/* REGISTER NEW USER INTO DB */
async function registerUser(userInfo) {
  await client.connect();
  const user = await users.findOne({email: userInfo.email});
  if (user) {
    return "The email exists, please use another email address";
  }
  const newData = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    userName: userInfo.userName,
    email: userInfo.email,
    pwd: userInfo.pwd
  };
  try {
    await users.insertOne(newData);
    return "success";
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

/* LOGIN USER */
async function userLogin(email, pwd) {
  await client.connect();
  const user = await users.findOne({email: email});
  if (!user) {
    return "User not exists, please register first";
  }
  if (user.pwd === pwd) {
    return "success";
  } else {
    return "Wrong password or email address, please try again";
  }
}

/* CREATE WORKOUT TO DB */
async function createWorkout(email, workoutInfo) {
  await client.connect();
  const newWorkout = {email: email, type: workoutInfo.type, date: workoutInfo.date, time: workoutInfo.time, duration: workoutInfo.duration, notes: workoutInfo.notes, finish: "No" };
  try {
    await arrangements.insertOne(newWorkout);
    console.log(arrangements);
    return "success";
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

/* GRAB DATA FOR WORKOUTS */
async function getData(email) {
  await client.connect();
  try {
    const arrangement = await arrangements.find({email: email}).sort({date: -1}).toArray();
    console.log("arrangement in myDB: ", arrangement);
    return arrangement;
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

/* GET DATA FOR USER */
async function getUserData(email) {
  await client.connect();
  try {
    const userData = await users.findOne({email: email});
    console.log("userData in myDB", userData);
    if (!userData) {return "Sorry, please log in first";};
    return userData;
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

async function getWorkout(_id) {
  let foundWorkout = null;
  for(let i = 0; i < arrangements.length; i++) {
    if(arrangements[i]._id === _id) {
      foundWorkout = arrangements[i];
    }
  }
  return foundWorkout;
}

module.exports = {
  registerUser,
  userLogin,
  createWorkout,
  getData,
  getUserData,
  getWorkout
};