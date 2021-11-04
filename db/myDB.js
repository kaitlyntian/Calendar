const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const url = process.env.MONGI_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(url, { useUnifiedTopology: true });
const db = client.db("calendar");
const users = db.collection("users");
const arrangements = db.collection("arrangements");

const bcrypt = require("bcrypt");

/* REGISTER NEW USER INTO DB */
async function registerUser(userInfo) {
  await client.connect();
  const user = await users.findOne({email: userInfo.email});
  if (user) {
    return "The email exists, please use another email address";
  }
  try {
    const hashedPassword = await bcrypt.hash(userInfo.pwd, 10);
    const newData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      userName: userInfo.userName,
      email: userInfo.email,
      pwd: hashedPassword,
    };
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
    return ["User not exists, please register first"];
  }
  try {
    if (await bcrypt.compare(pwd, user.pwd)) {
      console.log("username in DB:", user.userName);
      return ["success", user.userName];
    } else {
      return ["Wrong password or email address, please try again"];
    }
  } catch (e) {
    console.log({Error: e});
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
    console.log({Error: e});
  } finally {
    client.close();
  }
}

/* GRAB DATA FOR WORKOUTS */
async function getData(email) {
  await client.connect();
  try {
    const arrangement = await arrangements.find({email: email}).sort({date: -1}).toArray();
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
    if (!userData) {return "Sorry, please log in first";};
    return userData;
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

async function getWorkout(id) {
  await client.connect();
  try {
    const workoutData = await arrangements.findOne({"_id": new ObjectId(id)});
    console.log("workoutData in myDB", workoutData);
    return workoutData;
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

async function editWorkout(workoutInfo) {
  await client.connect();
  try {
    console.log(workoutInfo.id);
    const workoutData = await arrangements.updateOne({_id: workoutInfo.id}, {$set: {type: workoutInfo.type, date: workoutInfo.date, time: workoutInfo.time, duration: workoutInfo.duration, notes: workoutInfo.notes}});
    console.log("new workoutData in DB: ", workoutData);
    return "success";
  } catch (e) {
    console.log({Error: e});
  } finally {
    client.close();
  }
}

module.exports = {
  registerUser,
  userLogin,
  createWorkout,
  getData,
  getUserData,
  getWorkout,
  editWorkout
};