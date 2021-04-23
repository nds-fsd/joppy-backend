/** @format */

const express = require("express");
const { DeveloperController } = require("../controller");

const DeveloperRouter = express.Router();

DeveloperRouter.get("/", DeveloperController.findAll);

DeveloperRouter.get("/:id", DeveloperController.findOne);

DeveloperRouter.post("/", DeveloperController.create);

DeveloperRouter.post("/search", DeveloperController.search);

DeveloperRouter.put("/:id", DeveloperController.update);

DeveloperRouter.delete("/:id", DeveloperController.delete);

module.exports = { DeveloperRouter };
