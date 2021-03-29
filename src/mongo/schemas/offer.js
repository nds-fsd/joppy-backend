const mongoose = require("mongoose");

/* Puse las ref de city, roles y companyInfo como City, Roles y Company suponiendo esos nombres para los modelos,
cambiaré en caso de que se elijan nombres distintos*/

const schema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    title: { type: String, required: true },
    salary: { type: Number, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "City" },
    roles: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Roles" },
    description: { type: String, required: true },
    companyInfo: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Company" },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Offer = mongoose.model("Offer", schema);

module.exports = Offer;
