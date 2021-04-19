/** @format */

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			required: true,
			match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		},
		password: {
			type: String,
			required: true,
			match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
			minlength: 8,
		},
		role: { type: String, required: false },
		bio: { type: String, required: true },
		picture: { type: String, required: true },
		positions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Position",
			},
		],
		skills: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Skill",
			},
		],
		experience: [{ type: String, required: false }],
		education: { type: String, required: false },
		languages: [{ type: String, required: true }],
		salary: {
			currency: { type: String },
			range: {
				min: { type: Number, min: 0 },
				max: { type: Number, min: 0 },
			},
		},

		companySize: { type: String, required: false },
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
