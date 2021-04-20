/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Position = mongoose.model("Position", schema);

module.exports = Position;
