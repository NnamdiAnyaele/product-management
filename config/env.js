const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	mongoURI: process.env.MONGODB_URI,
	googleCred: process.env.GOOGLE_CRED,
	jwtSecret: process.env.JWT_SECRET_KEY,
	emailUsername: process.env.EMAIL_USERNAME,
	emailPassword: process.env.EMAIL_PASSWORD,
	accountSid: process.env.TWILIO_ACCOUNT_SID,
	authToken: process.env.TWILIO_AUTH_TOKEN,
	phoneNumber: process.env.TWILIO_PHONE_NUMBER,
	googleEmailUsername: process.env.GOOGLE_EMAIL_USERNAME,
	googleEmailPassword: process.env.GOOGLE_EMAIL_PASSWORD,
};
