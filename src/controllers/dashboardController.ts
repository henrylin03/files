import type { Request, Response } from "express";
import { prisma } from "@/lib/prisma.js";

const foldersAndFilesGet = async (req: Request, res: Response) => {
	const { user } = req;
	if (!user) return res.status(403).redirect("/login");

	const allFolders = await prisma.folder.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			name: "asc",
		},
	});

	res
		.status(200)
		.render("pages/dashboard", { title: "All files", folders: allFolders });
};

export { foldersAndFilesGet };
