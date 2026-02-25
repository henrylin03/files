import { Router } from "express";
import {
	filesGet,
	uploadFileGet,
	uploadFilePost,
} from "@/controllers/filesController.js";

const filesRouter = Router();

filesRouter.get("/", filesGet);
filesRouter.get("/upload", uploadFileGet);
filesRouter.post("/upload", uploadFilePost);

export { filesRouter };
