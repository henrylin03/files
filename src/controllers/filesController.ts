import type { Request, Response } from "express";
import { upload } from "@/lib/multer.js";

const getAllowedFileTypesForUpload = (): string => {
	const MS_WORD_FILE_TYPES = [
		".doc",
		".docx",
		".xml",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordpressingml.document",
	];

	const acceptedFileTypes = [
		"image/png",
		"image/jpg",
		".pdf",
		".txt",
		...MS_WORD_FILE_TYPES,
	];

	const fileTypeString = acceptedFileTypes.join(",");
	return fileTypeString;
};

const filesGet = (_req: Request, res: Response) => {
	res.redirect("/");
};

const uploadFileGet = (req: Request, res: Response) => {
	if (!req.user) return res.redirect("/login");
	res.render("pages/newFile", {
		title: "Upload new file",
		allowedFileTypes: getAllowedFileTypesForUpload(),
	});
};

const uploadFilePost = [
	upload.single("file"),
	async (_req: Request, res: Response) => {
		res.redirect("/dashboard");
	},
];

export { filesGet, uploadFileGet, uploadFilePost };
