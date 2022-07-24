const mongoose = require("mongoose");
const { mongoURI } = require("../config/env");

const connectDB = () => {
	const url = mongoURI;
	mongoose
		.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("info", "Successfully connected to MongoDB Atlas!");
		})
		.catch((error) => {
			console.log("error", error.message);
		});
};
module.exports = connectDB;
