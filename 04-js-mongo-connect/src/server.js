const express = require("express");
const db = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello from express!" });
});

app.get("/users", (req, res) => {
  const users = [];
  db.getDb()
    .collection("users")
    .find()
    .forEach((userDoc) => {
      users.push(userDoc);
    })
    .then((result) => {
      console.log("result", result);
      res.json({ users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

app.post("/users", (req, res) => {
  const newUser = req.body;

  db.getDb()
    .collection("users")
    .insertOne(newUser)
    .then((result) => {
      res
        .status(201)
        .json({ message: "created user", userId: result.insertedId });
    })
    .catch((err) => {
      res.status(500).json({ message: "error in create user" });
    });
});

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`listen on ${PORT}`);
    });
  }
});
