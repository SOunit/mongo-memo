const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);

module.exports = userRouter;
