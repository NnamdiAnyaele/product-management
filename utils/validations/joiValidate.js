const Joi = require("joi");

exports.validateUser = function (obj) {
	const schema = Joi.object({
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: false } })
			.required(),
		password: Joi.string()
			.pattern(
				new RegExp(
					"(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}"
				)
			)
			.error(
				new Error(
					"Must have an uppercase letter, a lowercase letter, a number, and a special character amd must be atleast 8 characters long"
				)
			)
			.required()
			.min(8)
			.max(30),
		firstName: Joi.string().min(3).max(30).required(),
		lastName: Joi.string().min(3).max(30).required(),
		address: Joi.string().required(),
		phoneNumber: Joi.string().required(),
		location: Joi.object().required(),
	});
	return schema.validate(obj);
};

exports.validateLogin = function (obj) {
	const schema = Joi.object({
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: false } })
			.required(),
		password: Joi.string()
			.pattern(
				new RegExp(
					"(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}"
				)
			)
			.error(
				new Error(
					"Must have an uppercase letter, a lowercase letter, a number, and a special character amd must be atleast 8 characters long"
				)
			)
			.required()
			.min(8)
			.max(30),
	});
	return schema.validate(obj);
};

exports.validateProduct = function (obj) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(30).required(),
		price: Joi.number().required(),
		description: Joi.string().min(3).max(100).required(),
		address: Joi.string().min(3).max(100).required(),
		location: Joi.array().required(),
		radius: Joi.number().required(),
	});
	return schema.validate(obj);
};
