import multer from "multer";

const storage = multer.diskStorage({
	destination: "./uploads",
	filename: (_req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, `${file.originalname}-${uniqueSuffix}`);
	},
});

const upload = multer({ storage });

export { upload };
