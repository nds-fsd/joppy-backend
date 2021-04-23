/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Language = mongoose.model("Language", schema);

module.exports = Language;
