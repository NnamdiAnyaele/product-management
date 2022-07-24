const path = require("path");
const multer = require("multer");

const fileSizeLimitErrorHandler = (err, req, res, next) => {
	if (err) {
		next(err);
	} else {
		next();
	}
};

// Set The Storage Engine
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../public/uploads/"));
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname +
				"-" +
				new Date().toISOString().replace(/:/g, "-") +
				path.extname(file.originalname)
		);
	},
});

// Check File Type
function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb("Error: Images Only!");
	}
}

// Init Upload
const upload = multer({
	storage: storage,
	limits: { fileSize: 2000000 },
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

module.exports = { upload, fileSizeLimitErrorHandler };
