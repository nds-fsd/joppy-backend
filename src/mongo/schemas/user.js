/** @format */

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		userName: { type: String, required: true },
		email: { type: String, required: true },
		password: {
			type: String,
			required: true,
			match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
			minlength: 8,
		},
		bio: { type: String, required: true },
		photo: { type: String, required: true },
		roles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Role",
			},
		],
		skills: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Skill",
			},
		],
		workExperiences: [{ type: String, required: false }],
		education: { type: String, required: false },
		languages: [{ type: String, required: true }],
		salary: {
			currency: { type: String },
			range: {
				min: { type: Number, min: 0 },
				max: { type: Number, min: 0 },
			},
		},

		companySize: { type: Number, required: false },
		typeEmployement: { type: String, required: false },
		city: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "City",
		},
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const User = mongoose.model("User", schema);

module.exports = User;
