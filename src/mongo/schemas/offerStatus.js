const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    offerId: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rejected: { type: Boolean, default: false },
    accepted: { type: Boolean, default: false },
    snoozed: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const OfferStatus = mongoose.model("OfferStatus", schema);

module.exports = OfferStatus;
