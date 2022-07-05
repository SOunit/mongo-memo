const { ObjectId } = require("mongodb");
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

  getUser: (req, res) => {
    const { userId } = req.params;

    db.getDb()
      .db()
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        res.json({ user });
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

  updateUser: (req, res) => {
    const updatedUser = req.body;
    const { userId } = req.params;

    db.getDb()
      .db()
      .collection("users")
      .updateOne({ _id: new ObjectId(userId) }, { $set: updatedUser })
      .then((result) => {
        res.status(201).json({ message: "updated user", userId });
      })
      .catch((err) => {
        res.status(500).json({ message: "error in update user" });
      });
  },

  deleteUser: (req, res) => {
    const { userId } = req.params;

    db.getDb()
      .db()
      .collection("users")
      .deleteOne({ _id: new ObjectId(userId) })
      .then((result) => {
        res.status(201).json({ message: "deleted user", userId });
      })
      .catch((err) => {
        res.status(500).json({ message: "error in delete user" });
      });
  },
};

module.exports = userController;
