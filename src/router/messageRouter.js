const express = require("express");
const { MessageController } = require("../controller");

const MessageRouter = express.Router();

MessageRouter.get("/:chatId", MessageController.index);
MessageRouter.post("/:chatId", MessageController.createOne);

module.exports = { MessageRouter };
