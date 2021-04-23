/** @format */

const mongoose = require("mongoose");

/* Puse las ref de city, roles y companyInfo como City, Roles y Company suponiendo esos nombres para los modelos,
cambiaré en caso de que se elijan nombres distintos*/

const schema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		salary: { type: Number, required: true },
		city: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],
		position: [{ type: mongoose.Schema.Types.ObjectId, ref: "Position" }],
		skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
		description: { type: String, required: true },
		companyInfo: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Offer = mongoose.model("Offer", schema);

module.exports = Offer;
