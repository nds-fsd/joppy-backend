/** @format */

const express = require("express");
const { OfferRouter } = require("./offerRouter");
const { CityRouter } = require("./cityRouter");
const { PositionRouter } = require("./positionRouter");
const { UserRouter } = require("./userRouter");
const { SkillRouter } = require("./skillRouter");
const { DeveloperSkillRouter } = require("./developerSkillRouter");
const { LanguageRouter } = require("./languageRouter");
const appRouter = express.Router();

appRouter.use("/city", CityRouter);
appRouter.use("/position", PositionRouter);
appRouter.use("/offer", OfferRouter);
appRouter.use("/user", UserRouter);
appRouter.use("/skill", SkillRouter);
appRouter.use("/developerSkill", DeveloperSkillRouter);
appRouter.use("/language", LanguageRouter);

// appRouter.use("/offer", companyRoleMiddleware, OfferRouter);
// por ejemplo, no queremos que developers modifiquen o creen offers

module.exports = appRouter;
