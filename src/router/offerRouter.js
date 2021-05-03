/** @format */

const express = require("express");
const { OfferController } = require("../controller");

const OfferRouter = express.Router();

OfferRouter.post("/", OfferController.createOffer);

OfferRouter.get("/", OfferController.findAllOffers);

OfferRouter.get("/ids", OfferController.findAllOfferIds);

OfferRouter.get("/:id", OfferController.findOneOffer);

OfferRouter.post("/count", OfferController.countOffers);

OfferRouter.post("/search", OfferController.searchPagination);

OfferRouter.post("/textsearch", OfferController.searchText);

OfferRouter.post("/regsearch", OfferController.searchReg);

OfferRouter.put("/:id", OfferController.updateOffer);

OfferRouter.delete("/:id", OfferController.deleteOffer);

module.exports = { OfferRouter };
