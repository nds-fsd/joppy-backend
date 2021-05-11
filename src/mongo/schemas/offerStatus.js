const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    offerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rejected: { type: Boolean },
    accepted: { type: Boolean },
    snoozed: { type: Boolean },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const OfferStatus = mongoose.model("OfferStatus", schema);

module.exports = OfferStatus;
