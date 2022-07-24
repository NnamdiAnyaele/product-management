const nodemailer = require("nodemailer");
// const { emailUsername, emailPassword } = require("../config/env");
const { googleEmailUsername, googleEmailPassword } = require("../config/env");

async function sendEmail(userEmail, subject, mailMessage) {
	try {
		let transport = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			auth: {
				user: googleEmailUsername,
				pass: googleEmailPassword,
			},
		});

		const mailOptions = {
			from: "no-reply@tradedpottask.com",
			to: "anyaelennamdi@gmail.com",
			subject,
			html: mailMessage,
		};

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
}

module.exports = sendEmail;
