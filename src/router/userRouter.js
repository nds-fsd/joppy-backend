/** @format */

const express = require("express");
const { UserController } = require("../controller");
const { allRoleMiddleware } = require("../middleware/userRoleMiddleware");

const UserRouter = express.Router();

UserRouter.get("/", UserController.findAll);

UserRouter.get("/:id", allRoleMiddleware, UserController.findOne);

UserRouter.post("/", UserController.create);

UserRouter.post("/search", UserController.search);

UserRouter.put("/:id", UserController.update);

UserRouter.delete("/:id", UserController.delete);

module.exports = { UserRouter };
