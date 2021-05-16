const express = require("express");
const { OfferStatusController } = require("../controller");

const OfferStatusRouter = express.Router();

OfferStatusRouter.post("/", OfferStatusController.createOfferStatus);

OfferStatusRouter.get("/", OfferStatusController.findAllOfferStatus);

OfferStatusRouter.get("/:id", OfferStatusController.findOneOfferStatus);

OfferStatusRouter.put("/:id", OfferStatusController.updateOfferStatus);

OfferStatusRouter.delete("/:id", OfferStatusController.deleteOfferStatus);

OfferStatusRouter.post("/filter", OfferStatusController.filterOffers);

OfferStatusRouter.post("/candidates", OfferStatusController.showCandidates);

module.exports = { OfferStatusRouter };
