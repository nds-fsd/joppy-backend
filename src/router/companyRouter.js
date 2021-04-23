/** @format */

const express = require("express");
const { CompanyController } = require("../controller");

const CompanyRouter = express.Router();

CompanyRouter.get("/", CompanyController.findAll);

CompanyRouter.get("/:id", CompanyController.findOne);

CompanyRouter.post("/", CompanyController.create);

CompanyRouter.post("/search", CompanyController.search);

CompanyRouter.put("/:id", CompanyController.update);

CompanyRouter.delete("/:id", CompanyController.delete);

module.exports = { CompanyRouter };
