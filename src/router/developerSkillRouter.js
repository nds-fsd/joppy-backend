/** @format */

const express = require("express");
const { DeveloperSkillController } = require("../controller");

const DeveloperSkillRouter = express.Router();

DeveloperSkillRouter.get("/", DeveloperSkillController.findAll);

DeveloperSkillRouter.get("/:id", DeveloperSkillController.findOne);

DeveloperSkillRouter.post("/", DeveloperSkillController.create);

DeveloperSkillRouter.post("/search", DeveloperSkillController.search);

DeveloperSkillRouter.put("/:id", DeveloperSkillController.update);

DeveloperSkillRouter.delete("/:id", DeveloperSkillController.delete);

module.exports = { DeveloperSkillRouter };
