const express = require("express");
const db = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
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
      res.json({ err });
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
