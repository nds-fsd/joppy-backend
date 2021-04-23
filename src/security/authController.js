/** @format */

require("dotenv").config();
const jwtMiddleware = require("express-jwt");
const express = require("express");
const { User } = require("../mongo");
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const jwtVerifier = (token, callback) => {
	jwt.verify(token, jwtSecret, callback);
};

const AuthRouter = express.Router();

AuthRouter.post("/login", (req, res) => {
	const { email, password } = req.body;

	User.findOne({ email })
		.then((user) => {
			if (!user)
				return res
					.status(400)
					.json({ error: { email: "This email is not registered" } });

			if (!user.comparePassword(password))
				return res.status(400).json({ error: { password: "Wrong password" } });

			res.status(200).json({
				token: user.generateJWT(),
				user: {
					id: user._id,
					username: user.userName,
					email: user.email,
				},
			});
		})
		.catch((err) => res.status(500).json({ message: err.message }));
});

AuthRouter.post("/register", (req, res) => {
	User.findOne({ email: req.body.email }).then((user) => {
		if (user)
			return res
				.status(400)
				.json({ error: { email: "This email already exists" } });

		const newUser = new User(req.body);
		newUser
			.save()
			.then((user) => {
				res
					.status(200)
					.json({
						token: user.generateJWT(),
						user: {
							id: user._id,
							username: user.userName,
							email: user.email,
						},
					})
					.catch((err) => res.status(500).json({ message: err.message }));
			})
			.catch((err) =>
				res.status(500).json({ success: false, message: err.message })
			);
	});
});

const configSecurity = (app) => {
	app.use(
		"/",
		jwtMiddleware({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
			path: ["/login", "/register"],
		})
	);
};

module.exports = { AuthRouter, jwtVerifier, configSecurity };
