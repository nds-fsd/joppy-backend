const express = require("express");
const { OfferRouter } = require("./offerRouter");
const { CityRouter } = require("./cityRouter");
const { RoleRouter } = require("./roleRouter");
const appRouter = express.Router();

appRouter.use("/city", CityRouter);
appRouter.use("/role", RoleRouter);
appRouter.use("/offer", OfferRouter);
module.exports = appRouter;
