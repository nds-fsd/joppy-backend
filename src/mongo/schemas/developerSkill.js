/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		years: { type: Number, required: true, unique: true },
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const DeveloperSkill = mongoose.model("DeveloperSkill", schema);

module.exports = DeveloperSkill;
