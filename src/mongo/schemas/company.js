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
		name: { type: String, required: false },
		bio: { type: String, required: false },
		logo: { type: String, required: false },
		tech: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: false,
				ref: "Skill",
			},
		],
		languages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: false,
				ref: "Language",
			},
		],
		companySize: { type: Number, required: false },
		city: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "City",
		},
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Company = mongoose.model("Company", schema);

module.exports = Company;
