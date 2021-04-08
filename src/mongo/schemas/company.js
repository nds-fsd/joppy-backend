const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    location: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Company = mongoose.model("Company", schema);

module.exports = Company;
