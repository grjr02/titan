const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
async function check(request, response) {
  let valid = db.collection("Valid").doc("validate");

  try {
    let ans = await valid.get();
    response.send(ans.data());
  } catch (error) {
    response.send(error);
  }
}

app.get("/", check);

exports.validate = functions.https.onRequest(app);

const app2 = express();
app2.use(cors({ origin: true }));

async function save(req, res) {
  db.collection("Response")
    .doc("survey")
    .set(req.body)
    .then(() => {
      res.send(req.body);
    })
    .catch((err) => {
      res.send(err);
    });

    db.collection("Valid")
    .doc("validate")
    .set({survey:false})
    .then(() => {
      res.send(req.body);
    })
    .catch((err) => {
      res.send(err);
    });
}

app2.post("/", save);
exports.save = functions.https.onRequest(app2);
