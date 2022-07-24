const ProductService = require("../services/products");
const { validateProduct } = require("../utils/validations/joiValidate");
const { JsonResponse } = require("../utils/apiResponse");

exports.create = async (req, res, next) => {
	try {
		const { error } = validateProduct(req.body);
		if (error) {
			JsonResponse(res, 400, error.message);
			return;
		}
		const body = req.body;
		const product = await ProductService.create({
			...body,
			imageUrl: req.file.path,
			author: req.user._id.toString(),
		});
		return JsonResponse(res, 201, "Product created Successfully!", {
			data: product,
		});
	} catch (error) {
		return next(error);
	}
};

exports.getAll = async (req, res, next) => {
	try {
		const products = await ProductService.getAll();
		return JsonResponse(res, 200, "Products fetched Successfully!", {
			data: products,
		});
	} catch (error) {
		return next(error);
	}
};

exports.getUserProducts = async function (req, res, next) {
	try {
		const id = req.user._id.toString();
		const products = await ProductService.getUserProducts(id);
		return JsonResponse(res, 200, "Products fetched Successfully!", {
			data: products,
		});
	} catch (error) {
		return next(error);
	}
};

exports.getProductsByLocationRadius = async function (req, res, next) {
	try {
		const userId = req.user._id.toString();
		const body = req.body;
		const products = await ProductService.getProductsByLocationRadius(userId);
		return JsonResponse(res, 200, "Products fetched Successfully!", {
			data: products,
		});
	} catch (error) {
		return next(error);
	}
};

exports.getProduct = async function (req, res, next) {
	try {
		const { id } = req.params;
		const product = await ProductService.getOne(id);
		return JsonResponse(res, 200, "Product fetched Successfully!", {
			data: product,
		});
	} catch (error) {
		return next(error);
	}
};

exports.delete = async function (req, res, next) {
	try {
		const userId = req.user._id.toString();
		const { id } = req.params;
		const product = await ProductService.delete(id, userId);
		return JsonResponse(res, 200, "Product deleted Successfully!", {
			data: product,
		});
	} catch (error) {
		return next(error);
	}
};

exports.update = async function (req, res, next) {
	try {
		const userId = req.user._id.toString();
		const { id } = req.params;
		const body = req.body;
		const product = await ProductService.update(id, body, userId);
		return JsonResponse(res, 200, "Product updated Successfully!", {
			data: product,
		});
	} catch (error) {
		return next(error);
	}
};

exports.addComment = async function (req, res, next) {
	try {
		const { id } = req.params;
		const body = req.body;
		const product = await ProductService.addComment(id, body, req.user);
		return JsonResponse(res, 200, "Comment added Successfully!", {
			data: product,
		});
	} catch (error) {
		return next(error);
	}
};
