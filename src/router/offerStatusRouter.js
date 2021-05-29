const express = require("express");
const { OfferStatusController } = require("../controller");
const { OfferStatus } = require("../mongo");

const OfferStatusRouter = express.Router();

OfferStatusRouter.post("/", OfferStatusController.createOfferStatus);

OfferStatusRouter.get("/", OfferStatusController.findAllOfferStatus);

OfferStatusRouter.get("/:id", OfferStatusController.findOneOfferStatus);

OfferStatusRouter.put("/:id", OfferStatusController.updateOfferStatus);

OfferStatusRouter.post("/search", OfferStatusController.findAcceptedOfferStatus);

OfferStatusRouter.delete("/:id", OfferStatusController.deleteOfferStatus);

OfferStatusRouter.post("/filter", OfferStatusController.filterOffers);

OfferStatusRouter.post("/candidates", OfferStatusController.showCandidates);

OfferStatusRouter.post("/acceptedoffers", OfferStatusController.showAcceptedOffers);
OfferStatusRouter.post("/snoozedoffers", OfferStatusController.showSnoozedOffers);

module.exports = { OfferStatusRouter };
