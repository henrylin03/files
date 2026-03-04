import multer from "multer";

const storage = multer.memoryStorage();

export const multerUpload = multer({
	storage,
	limits: {
		fileSize: 2 * 1024 * 1024, // 2MB
	},
});
