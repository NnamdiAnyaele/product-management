const admin = require("firebase-admin");
const { db } = require("../database/firestoreConnect");
const UserModel = require("../models/userModel");
const { calcCrow } = require("../utils/helpers");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendemail");
const sendSms = require("../utils/sendSms");
const commentNotification = require("../utils/emailTemplate/commentNotification");

exports.create = async function (data) {
	const {
		name,
		price,
		description,
		imageUrl,
		author,
		location,
		radius,
		address,
	} = data;
	const product = await db.collection("products").add({
		name,
		price,
		description,
		imageUrl,
		author,
		location,
		radius,
		comments: [],
		address,
	});
	return product;
};

exports.getAll = async function () {
	const products = await db.collection("products").get();
	const result = products.docs.map((doc) => doc.data());
	return result;
};

exports.getUserProducts = async function (id) {
	const products = await db
		.collection("products")
		.where("author", "==", id)
		.get();
	const result = products.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	return result;
};

exports.getProductsByLocationRadius = async function (userId) {
	const user = await UserModel.findById(userId);
	if (!user) {
		throw new ErrorResponse("User does not exist", 400);
	}
	const userLocation = user.location.coordinates;
	const products = await db.collection("products").get();
	const productData = products.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	const result = [];
	productData.forEach((product) => {
		const distance = calcCrow(
			userLocation[0],
			product.location[0],
			userLocation[1],
			product.location[1]
		);
		if (distance <= product.radius) {
			result.push(product);
		}
	});
	return result;
};

exports.getOne = async function (id) {
	const product = await db.collection("products").doc(id).get();
	return product.data();
};

exports.delete = async function (id, userId) {
	const productData = await db.collection("products").doc(id).get();
	if (productData.data().author !== userId) {
		throw new ErrorResponse(
			"You are not authorized to update this product",
			400
		);
	}
	const product = await db.collection("products").doc(id).delete();
	return product;
};

exports.update = async function (id, data, userId) {
	const productData = await db.collection("products").doc(id).get();

	if (productData.data().author !== userId) {
		throw new ErrorResponse(
			"You are not authorized to update this product",
			400
		);
	}
	const product = await db.collection("products").doc(id).update(data);
	return product;
};

exports.addComment = async function (id, data, user) {
	const productData = await db.collection("products").doc(id).get();
	if (!productData.data()) {
		throw new ErrorResponse("Product does not exist", 400);
	}
	const author = productData.data().author;
	const authorDetails = await UserModel.findById(author);
	const product = await db
		.collection("products")
		.doc(id)
		.update({
			comments: admin.firestore.FieldValue.arrayUnion({
				...data,
				id: user._id.toString(),
			}),
		});
	const mailingMess = commentNotification(
		authorDetails.firstName,
		`${user.firstName} ${user.lastName}`,
		data.comment
	);

	await sendEmail(
		authorDetails.email,
		"Product Comment Notification",
		mailingMess
	)
		.then((res) => console.log(res))
		.catch((err) => console.log(err));

	const smsMess = `${user.firstName} ${user.lastName} commented on your product.
		${data.comment}`;

	await sendSms(authorDetails.phoneNumber, smsMess)
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
	return product;
};
