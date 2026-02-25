import multer from "multer";

const getUniqueFilename = (file: Express.Multer.File): string => {
	const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

	const originalNameSplit = file.originalname.split(".");
	const fileExtension = originalNameSplit.pop();
	const originalNameWithoutFileExtension = originalNameSplit.join("");

	return `${originalNameWithoutFileExtension} - ${uniqueSuffix}.${fileExtension}`;
};

const storage = multer.diskStorage({
	destination: "./uploads",
	filename: (_req, file, callback) => {
		const uniqueFilename = getUniqueFilename(file);
		callback(null, uniqueFilename);
	},
});

export const upload = multer({ storage });
