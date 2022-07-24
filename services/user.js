const UserModel = require("../models/userModel");
const { generateToken } = require("../utils/auth");
const ErrorResponse = require("../utils/errorResponse");

exports.registerUser = async function (data) {
	const {
		email,
		password,
		firstName,
		lastName,
		address,
		location,
		phoneNumber,
	} = data;
	const userEmail = email.toLowerCase();
	const exist = await UserModel.findOne({ email: userEmail });
	if (exist) {
		throw new ErrorResponse("User already exists", 400);
	}

	const newUser = await new UserModel({
		email: userEmail,
		password,
		firstName,
		lastName,
		address,
		location,
		phoneNumber,
	});
	const result = await newUser.save();

	const token = generateToken(newUser._id);

	return { user: result, token };
};

exports.loginUser = async function (data) {
	const { password, email } = data;
	const userEmail = email.toLowerCase();
	const user = await UserModel.findOne({ email: userEmail });
	if (user && (await user.isPasswordMatch(password))) {
		const token = generateToken(user._id);
		return { user, token };
	}
	throw new ErrorResponse("Invalid credentials", 400);
};
