const express = require("express");
const { OfferRouter } = require("./offerRouter");
const { UserRouter } = require("./userRouter");
const appRouter = express.Router();

appRouter.use("/user", UserRouter);
appRouter.use("/offer", OfferRouter);
module.exports = appRouter;
