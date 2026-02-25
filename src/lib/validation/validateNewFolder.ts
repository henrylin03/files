import { body } from "express-validator";

export const validateNewFolderForm = [
	body("folderName")
		.trim()
		.notEmpty()
		.withMessage("Folder name is required")
		.isAlphanumeric("en-AU", { ignore: "-_ )(" })
		.withMessage(
			"Folder names can only contain letters, numbers, spaces, hyphens (-), underscores (_) and parentheses ()",
		)
		.isLength({ min: 1, max: 255 })
		.withMessage("Please enter a folder name that is max 255 characters"),
];
