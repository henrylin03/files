import type { NextFunction, Request, Response } from "express";
import { upload } from "@/lib/multer.js";
import { prisma } from "@/lib/prisma.js";

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

export const filesGet = (_req: Request, res: Response) => {
	res.redirect("/");
};

export const uploadFileGet = async (req: Request, res: Response) => {
	const { user } = req;
	if (!user) return res.status(401).redirect("/login");

	const { folder: folderIdToAddFile } = req.query;
	if (!folderIdToAddFile) return res.status(400).redirect("/folders");

	const folder = await prisma.folder.findUnique({
		where: {
			id: Number(folderIdToAddFile),
			userId: user.id,
		},
	});
	if (folder === null)
		return res.status(404).render("pages/error", {
			statusCode: 404,
			errorMessage:
				"Folder does not exist. Please only upload files to existing folders.",
		});

	res.render("pages/newFile", {
		title: "Upload new file",
		allowedFileTypes: getAllowedFileTypesForUpload(),
	});
};

export const uploadFilePost = [
	async (req: Request, res: Response, next: NextFunction) => {
		const { user } = req;
		if (!user) return res.status(401).redirect("/login");
		next();
	},
	upload.single("file"),
	async (_req: Request, res: Response) => {
		console.log("upload done.");
		res.redirect("/dashboard");
	},
];
