import { Router } from "express";
import {
	fileDelete,
	filesGet,
	uploadFileGet,
	uploadFilePost,
} from "@/controllers/filesController.js";

const filesRouter = Router();

filesRouter.get("/", filesGet);

filesRouter.get("/upload", uploadFileGet);
filesRouter.post("/upload", uploadFilePost);

filesRouter.post("/{:id}/delete", fileDelete);

export { filesRouter };
