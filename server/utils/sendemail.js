const nodemailer = require("nodemailer");
const { emailUsername, emailPassword } = require("../config/env");

async function sendEmail(userEmail, subject, mailMessage) {
	try {
		let transport = nodemailer.createTransport({
			host: "smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: emailUsername,
				pass: emailPassword,
			},
		});

		const mailOptions = {
			from: "no-reply@tradedpottask.com",
			to: userEmail,
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
