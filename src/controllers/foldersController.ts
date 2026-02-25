import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
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
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).render("pages/newFolder", {
				title: PAGE_TITLE,
				errors: errors.array(),
			});

		const { folderName } = matchedData(req);
		console.log(folderName);

		res.redirect("/folders");
	},
];

export { addFolderGet, addFolderPost, foldersGet };
