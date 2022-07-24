const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const pointSchema = new Schema({
	type: {
		type: String,
		enum: ["Point"],
		required: true,
	},
	coordinates: {
		type: [Number],
		required: true,
	},
});

const userSchema = new Schema(
	{
		email: { type: String, require: true, unique: true },
		firstName: { type: String, require: true },
		lastName: { type: String, require: true },
		password: {
			type: String,
			require: true,
			minlength: 8,
		},
		address: {
			type: String,
			require: true,
		},
		phoneNumber: {
			type: String,
			require: true,
		},
		location: {
			type: pointSchema,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.methods.toJSON = function () {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;

	return userObject;
};

// hash password
userSchema.pre("save", async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		// eslint-disable-next-line no-console
	}
});
// verify password

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password);
};

const UserModel = model("User", userSchema);

module.exports = UserModel;
