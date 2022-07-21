const admin = require("firebase-admin");
const { googleCred } = require("../config/env");

const serviceAccount = JSON.parse(googleCred);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };
