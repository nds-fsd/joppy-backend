const express = require("express");
const { ChatController } = require("../controller");

const ChatRouter = express.Router();

ChatRouter.get("/", ChatController.index);
ChatRouter.get("/:id", ChatController.getOne);
ChatRouter.post("/", ChatController.createOne);
ChatRouter.delete("/:id", ChatController.deleteOne);
ChatRouter.post("/search", ChatController.findByUsers);

module.exports = { ChatRouter };
