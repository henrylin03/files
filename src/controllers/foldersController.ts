import type { Request, Response } from "express";

const foldersGet = async (_req: Request, res: Response) => {
	res.redirect("/");
};

const addFolderGet = async (_req: Request, res: Response) => {
	res.render("pages/newFolder", { title: "Add folder" });
};

const addFolderPost = async (req: Request, res: Response) => {
	const { body } = req;
	console.log(body);
	res.redirect("/folders");
};

export { addFolderGet, addFolderPost, foldersGet };
