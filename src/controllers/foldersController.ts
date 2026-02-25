import increment from "add-filename-increment";
import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { prisma } from "@/lib/prisma.js";
import { validateNewFolderForm } from "@/lib/validation/validateNewFolder.js";

const PAGE_TITLE = "Add folder";

const foldersGet = async (_req: Request, res: Response) => {
	res.redirect("/");
};

const folderGet = async (req: Request, res: Response) => {
	if (!req.user) return res.status(403).redirect("/login");

	const { id: userId } = req.user;
	const { id: folderId } = req.params;

	const folder = await prisma.folder.findUnique({
		where: { userId, id: Number(folderId) },
	});
	if (folder === null) return res.status(404).render("pages/error");

	res.render("pages/folder", { folder });
};

const addFolderGet = async (_req: Request, res: Response) => {
	res.render("pages/newFolder", { title: PAGE_TITLE });
};

const addFolderPost = [
	validateNewFolderForm,
	async (req: Request, res: Response) => {
		const { user } = req;
		if (!user) return res.status(403).redirect("/login");

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).render("pages/newFolder", {
				title: PAGE_TITLE,
				errors: errors.array(),
			});

		let { folderName } = matchedData(req);
		let existingFolderWithSameName = await prisma.folder.findUnique({
			where: {
				name: folderName,
				userId: user.id,
			},
		});
		while (existingFolderWithSameName !== null) {
			folderName = increment(folderName, { platform: "win32" });
			existingFolderWithSameName = await prisma.folder.findUnique({
				where: {
					name: folderName,
					userId: user.id,
				},
			});
		}

		const newFolder = await prisma.folder.create({
			data: {
				name: folderName,
				userId: user.id,
			},
		});

		res.status(201).redirect(`/folders/${newFolder.id}`);
	},
];

export { addFolderGet, addFolderPost, folderGet, foldersGet };
