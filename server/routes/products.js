const express = require("express");
const {
	create,
	getAll,
	getUserProducts,
	getProductsByLocationRadius,
	getProduct,
    delete: deleteProduct,
    update: updateProduct,
    addComment,
} = require("../controller/products");
const { upload, fileSizeLimitErrorHandler } = require("../middleware/multer");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get("/getUserProducts", verifyToken, getUserProducts);

router.get(
	"/getProductsByLocationRadius",
	verifyToken,
	getProductsByLocationRadius
);

router.delete("/:id", verifyToken, deleteProduct);

router.put("/:id", verifyToken, updateProduct);

router.post("/comment/:id", verifyToken, addComment);

router.post(
	"/",
	verifyToken,
	upload.single("image"),
	fileSizeLimitErrorHandler,
	create
);

router.get("/", getAll);

router.get("/:id", verifyToken, getProduct);

module.exports = router;
