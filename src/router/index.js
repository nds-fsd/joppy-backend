/** @format */

const express = require("express");
const { OfferRouter } = require("./offerRouter");
const { CityRouter } = require("./cityRouter");
const { PositionRouter } = require("./positionRouter");
const { UserRouter } = require("./userRouter");
const { SkillRouter } = require("./skillRouter");
const appRouter = express.Router();

appRouter.use("/city", CityRouter);
appRouter.use("/position", PositionRouter);
appRouter.use("/offer", OfferRouter);
appRouter.use("/user", UserRouter);
appRouter.use("/skill", SkillRouter);

module.exports = appRouter;
