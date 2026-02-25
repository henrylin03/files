import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { prisma } from "@/lib/prisma.js";
import { validateNewFolder } from "@/lib/validationUtils.js";

const PAGE_TITLE = "Add folder";

const foldersGet = async (_req: Request, res: Response) => {
	res.redirect("/");
};

const addFolderGet = async (_req: Request, res: Response) => {
	res.render("pages/newFolder", { title: PAGE_TITLE });
};

const addFolderPost = [
	validateNewFolder,
	async (req: Request, res: Response) => {
		const { user } = req;
		if (!user) return res.status(403).redirect("/login");

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).render("pages/newFolder", {
				title: PAGE_TITLE,
				errors: errors.array(),
			});

		const { folderName: name } = matchedData(req);

		const _newFolder = await prisma.folder.create({
			data: {
				name,
				userId: user.id,
			},
		});

		res.status(201).redirect("/folders");
	},
];

export { addFolderGet, addFolderPost, foldersGet };
