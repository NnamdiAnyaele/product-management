const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const { JsonResponse } = require("../utils/apiResponse");
const { jwtSecret } = require("../config/env");

async function verifyToken(req, res, next) {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, jwtSecret);
			const user = await UserModel.findById(decoded.id);
			req.user = user;
			return next();
		} catch (error) {
			return JsonResponse(res, 401, "Unauthorized");
		}
	} else {
		return JsonResponse(res, 401, "Not Authorised, invalid token");
	}
}

module.exports = { verifyToken };
