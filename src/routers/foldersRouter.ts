import { Router } from "express";
import {
	addFolderGet,
	addFolderPost,
	folderDelete,
	foldersGet,
} from "@/controllers/foldersController.js";

const foldersRouter = Router();

foldersRouter.get("/", foldersGet);

foldersRouter.get("/new", addFolderGet);
foldersRouter.post("/new", ...addFolderPost);

foldersRouter.post("/{:id}/delete", folderDelete);

export { foldersRouter };
