/** @format */

const express = require("express");
const { LanguageController } = require("../controller");

const LanguageRouter = express.Router();

LanguageRouter.get("/", LanguageController.findAll);

LanguageRouter.get("/:id", LanguageController.findOne);

LanguageRouter.post("/", LanguageController.create);

LanguageRouter.post("/search", LanguageController.search);

LanguageRouter.put("/:id", LanguageController.update);

LanguageRouter.delete("/:id", LanguageController.delete);

module.exports = { LanguageRouter };
