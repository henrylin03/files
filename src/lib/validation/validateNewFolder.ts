import { body } from "express-validator";

export const validateNewFolderForm = [
	body("folderName")
		.trim()
		.notEmpty()
		.withMessage("Folder name is required")
		.isAlphanumeric("en-AU", { ignore: "-_ " })
		.withMessage(
			"Folder name can only letters, numbers, spaces, hyphens and underscores",
		)
		.isLength({ min: 1, max: 255 })
		.withMessage("Please enter a folder name that is max 255 characters"),
];
