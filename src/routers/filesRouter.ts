import { Router } from "express";
import { filesGet, uploadFileGet } from "@/controllers/filesController.js";

const filesRouter = Router();

filesRouter.get("/", filesGet);
filesRouter.get("/upload", uploadFileGet);

export { filesRouter };
