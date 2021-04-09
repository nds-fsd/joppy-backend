const express = require("express");
const { SkillController } = require("../controller");

const SkillRouter = express.Router();

SkillRouter.get("/", SkillController.findAll);

SkillRouter.get("/:id", SkillController.findOne);

SkillRouter.post("/", SkillController.create);

SkillRouter.post("/search", SkillController.search);

SkillRouter.put("/:id", SkillController.update);

SkillRouter.delete("/:id", SkillController.delete);

module.exports = { SkillRouter };
