import { Router } from "express";
import {
	addFolderGet,
	addFolderPost,
	foldersGet,
} from "@/controllers/foldersController.js";

const foldersRouter = Router();

foldersRouter.get("/", foldersGet);
foldersRouter.get("/new", addFolderGet);
foldersRouter.post("/new", ...addFolderPost);

export { foldersRouter };
