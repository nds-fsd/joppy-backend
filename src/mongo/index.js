require("./connection");

const Offer = require("./schemas/offer.js");
const City = require("./schemas/city.js");
const Role = require("./schemas/role.js");
const User = require("./schemas/user.js");
const Company = require("./schemas/company.js");
const Skill = require("./schemas/skill.js");

module.exports = {
  User,
  City,
  Role,
  Offer,
  Company,
  Skill,
};
