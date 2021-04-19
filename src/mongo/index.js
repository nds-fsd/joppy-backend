/** @format */

require("./connection");

const Offer = require("./schemas/offer.js");
const City = require("./schemas/city.js");
const Position = require("./schemas/position.js");
const User = require("./schemas/user.js");
const Skill = require("./schemas/skill.js");

module.exports = {
	User,
	City,
	Position,
	Offer,
	Skill,
};
