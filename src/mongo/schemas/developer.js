/** @format */

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "User",
		},
		firstName: { type: String, required: false },
		lastName: { type: String, required: false },
		bio: { type: String, required: false },
		photo: { type: String, required: false },
		positions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: false,
				ref: "Position",
			},
		],
		skills: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: false,
				ref: "DeveloperSkill",
			},
		],
		workExperiences: [{ type: String, required: false }],
		education: { type: String, required: false },
		languages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: false,
				ref: "Language",
			},
		],
		salary: {
			currency: { type: String },
			range: {
				min: { type: Number, min: 0 },
				max: { type: Number, min: 0 },
			},
		},
		city: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "City",
		},
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Developer = mongoose.model("Developer", schema);

module.exports = Developer;
