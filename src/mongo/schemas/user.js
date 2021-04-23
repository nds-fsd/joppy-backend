/** @format */

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const roles = ["DEVELOPER_ROLE", "COMPANY_ROLE", "ADMIN_ROLE"];

const schema = new mongoose.Schema(
	{
		userName: { type: String, required: true },
		email: { type: String, required: true },
		password: {
			type: String,
			required: true,
			// match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
			// minlength: 8,
		},
		role: { type: String, required: false, default: roles[0] },
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

//esta funcion se ejecuta "antes" de guardar cualquier usuario en Mongo
schema.pre("save", function (next) {
	const user = this;

	if (!roles.includes(user.role)) {
		throw new Error(`The role ${user.role} is not valid`);
	}

	//si no se ha cambiado la contraseña, seguimos
	if (!user.isModified("password")) return next();

	//brcypt es una libreria que genera "hashes", encriptamos la contraseña
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			//si no ha habido error en el encryptado, guardamos
			user.password = hash;
			next();
		});
	});
});

schema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

schema.methods.generateJWT = () => {
	let payload = {
		id: this._id,
		email: this.email,
		username: this.userName,
		role: this.role,
	};

	return jwt.sign(payload, jwtSecret);
};

const User = mongoose.model("User", schema);

module.exports = User;
