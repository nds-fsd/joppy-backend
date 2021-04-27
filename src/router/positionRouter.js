/** @format */

const express = require("express");
const { PositionController } = require("../controller");

const PositionRouter = express.Router();

PositionRouter.get("/", PositionController.findAll);

PositionRouter.get("/:id", PositionController.findOne);

PositionRouter.post("/", PositionController.create);

PositionRouter.post("/search", PositionController.search);

PositionRouter.put("/:id", PositionController.update);

PositionRouter.delete("/:id", PositionController.delete);

module.exports = { PositionRouter };
