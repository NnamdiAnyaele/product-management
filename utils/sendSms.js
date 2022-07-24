const { accountSid, authToken, phoneNumber } = require("../config/env");

const client = require("twilio")(accountSid, authToken);

async function sendSms(userPhone, message) {
	try {
		const result = await client.messages.create({
			body: message,
			to: userPhone,
			from: phoneNumber,
		});
		return result;
	} catch (error) {
		return error;
	}
}

module.exports = sendSms;
