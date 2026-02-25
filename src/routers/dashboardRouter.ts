import { Router } from "express";
import { foldersAndFilesGet } from "@/controllers/dashboardController.js";

const dashboardRouter = Router();

dashboardRouter.get("/", foldersAndFilesGet);

export { dashboardRouter };
