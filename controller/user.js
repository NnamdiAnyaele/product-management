const {
	validateUser,
	validateLogin,
} = require("../utils/validations/joiValidate");
const ErrorResponse = require("../utils/errorResponse");
const { JsonResponse } = require("../utils/apiResponse");
const UserService = require("../services/user");

exports.register = async function (req, res, next) {
	try {
		const { error } = validateUser(req.body);
		if (error) {
			JsonResponse(res, 400, error.message);
			return;
		}
		const body = req.body;
		const { user, token } = await UserService.registerUser(body);
		return JsonResponse(res, 201, "User created Successfully!", {
			data: user,
			token,
		});
	} catch (error) {
		return next(error);
	}
};

exports.login = async function (req, res, next) {
	try {
		const { error } = validateLogin(req.body);
		if (error) {
			JsonResponse(res, 400, error.message);
			return;
		}
		const body = req.body;
		const { user, token } = await UserService.loginUser(body);
		return JsonResponse(res, 200, "User logged in Successfully!", {
			data: user,
			token,
		});
	} catch (error) {
		return next(error);
	}
};
