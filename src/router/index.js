const express = require("express");
const { OfferRouter } = require("./offerRouter");
const { CityRouter } = require("./cityRouter");
const { RoleRouter } = require("./roleRouter");
const { UserRouter } = require("./userRouter");
const { CompanyRouter } = require("./companyRouter");
const appRouter = express.Router();

appRouter.use("/city", CityRouter);
appRouter.use("/role", RoleRouter);
appRouter.use("/offer", OfferRouter);
appRouter.use("/user", UserRouter);
appRouter.use("/company", CompanyRouter);

module.exports = appRouter;
