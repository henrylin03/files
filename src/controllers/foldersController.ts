import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { FILE_TYPE_TO_IMG_PATH } from "@/data/imgPaths.js";
import { prisma } from "@/lib/prisma.js";
import { validateFolderName } from "@/validators/validateFolder.js";

const PAGE_TITLES = { folders: "Folders", newFolder: "Add folder" };

const foldersGet = async (req: Request, res: Response) => {
	const { user } = req;
	if (!user) return res.status(401).redirect("/login");

	const allFolders = await prisma.folder.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			name: "asc",
		},
	});

	res.status(200).render("pages/folders", {
		title: PAGE_TITLES.folders,
		folders: allFolders,
	});
};

const folderGet = async (req: Request, res: Response) => {
	if (!req.user) return res.status(401).redirect("/login");

	const { id: userId } = req.user;
	const { id: folderId } = req.params;

	const folder = await prisma.folder.findUnique({
		where: {
			userId,
			id: Number(folderId),
		},
		include: {
			files: true,
		},
	});

	if (folder === null)
		return res.status(404).render("pages/error", {
			statusCode: 404,
			errorMessage: "Folder not found.",
		});

	res.render("pages/folder", {
		title: folder.name,
		folder,
		fileTypeToImgMap: FILE_TYPE_TO_IMG_PATH,
	});
};

const addFolderGet = async (_req: Request, res: Response) => {
	res.render("pages/newFolder", { title: PAGE_TITLES.newFolder });
};

const addFolderPost = [
	validateFolderName,
	async (req: Request, res: Response) => {
		const { user } = req;
		if (!user) return res.status(401).redirect("/login");

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).render("pages/newFolder", {
				title: PAGE_TITLES.newFolder,
				errors: errors.array(),
			});

		const { folderName } = matchedData(req);
		const newFolder = await prisma.folder.create({
			data: {
				name: folderName,
				userId: user.id,
			},
		});

		res.status(201).redirect(`/folders/${newFolder.id}`);
	},
];

const folderDelete = async (req: Request, res: Response) => {
	const { user } = req;
	if (!user) return res.status(401).redirect("/login");

	const { id: folderId } = req.params;

	const deleteFiles = prisma.file.deleteMany({
		where: {
			userId: user.id,
			folderId: Number(folderId),
		},
	});
	const deleteFolder = prisma.folder.delete({
		where: {
			userId: user.id,
			id: Number(folderId),
		},
	});

	const _transaction = await prisma.$transaction([deleteFiles, deleteFolder]);
	res.redirect("/");
};

const folderRename = [
	validateFolderName,
	async (req: Request, res: Response) => {
		const { user } = req;
		if (!user) return res.status(401).redirect("/login");

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).render("pages/folders", {
				title: PAGE_TITLES.folders,
				errors: errors.array(),
			});

		console.log("errors:", errors);

		const { id: folderId } = req.params;
		const { folderName: newFolderName } = matchedData(req);
		const _updateFolder = await prisma.folder.update({
			where: {
				userId: user.id,
				id: Number(folderId),
			},
			data: {
				name: newFolderName,
			},
		});

		res.redirect("/folders");
	},
];

export {
	addFolderGet,
	addFolderPost,
	folderDelete,
	folderGet,
	foldersGet,
	folderRename,
};
