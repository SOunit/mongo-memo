const db = require("../db");

const userController = {
  getUsers: (req, res) => {
    const users = [];
    db.getDb()
      .db()
      .collection("users")
      // this returns cursor
      .find()
      // iterate cursor with forEach
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
  },

  createUser: (req, res) => {
    const newUser = req.body;

    db.getDb()
      .db()
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
  },
};

module.exports = userController;
