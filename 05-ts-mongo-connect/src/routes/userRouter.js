const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);
userRouter.get("/:userId", userController.getUser);
userRouter.patch("/:userId", userController.updateUser);
userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;
