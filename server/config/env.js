const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	mongoURI: process.env.MONGODB_URI,
	googleCred: process.env.GOOGLE_CRED,
};
