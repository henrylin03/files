import { Router } from "express";
import {
	fileDelete,
	fileDetailsGet,
	filesGet,
	uploadFileGet,
	uploadFilePost,
} from "@/controllers/filesController.js";

const filesRouter = Router();

filesRouter.get("/", filesGet);
filesRouter.get("/{:id}", fileDetailsGet);

filesRouter.get("/upload", uploadFileGet);
filesRouter.post("/upload", uploadFilePost);

filesRouter.post("/{:id}/delete", fileDelete);

export { filesRouter };
