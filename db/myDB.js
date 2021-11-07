const { MongoClient } = require("mongodb");
require("dotenv").config();

const ObjectId = require("mongodb").ObjectId;
//process.env.MONGI_URL
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@calendar.ancvz.mongodb.net/calendar?retryWrites=true&w=majority` || "mongodb://127.0.0.1:27017";
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

async function countFinished(email) {
  await client.connect();
  try {
    const count = await arrangements.find({email: email, finish: "Yes"}).count();
    return count;
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
    const workoutData = await arrangements.updateOne({"_id": ObjectId(workoutInfo.completed)}, {$set: {type: workoutInfo.type, date: workoutInfo.date, time: workoutInfo.time, duration: workoutInfo.duration, notes: workoutInfo.notes}});
    return "success";
  } catch (e) {
    console.log({Error: e});
  } finally {
    client.close();
  }
}

async function completeWorkout(workoutInfo) {
  await client.connect();
  try {
    await arrangements.updateOne({"_id": new ObjectId(workoutInfo.completed)}, {$set: {finish: "Yes"}});
    return "success";
  } catch(e) {
    console.log(e);
  } finally {
    client.close();
  }
}
/*DELECT WORKOUT*/
async function deleteWorkout(id) {
  await client.connect();
  try {
    await arrangements.deleteOne({"_id": ObjectId(id)});
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
  editWorkout,
  completeWorkout,
  deleteWorkout,
  countFinished
};