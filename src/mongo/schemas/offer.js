const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    salary: { type: String, required: true },
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],
    position: [{ type: mongoose.Schema.Types.ObjectId, ref: "Position" }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    description: { type: String, required: true },
    companyInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    accepted: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    rejected: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Offer = mongoose.model("Offer", schema);

module.exports = Offer;
