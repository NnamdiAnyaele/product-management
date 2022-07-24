const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

exports.generateToken = function (userId) {
	return jwt.sign({ id: userId }, jwtSecret, {
		expiresIn: "2d",
	});
};
