export const getFileExtension = (file: Express.Multer.File): `.${string}` => {
	const originalNameSplit = file.originalname.split(".");
	const fileExtension = originalNameSplit.pop();
	return `.${fileExtension}`;
};
