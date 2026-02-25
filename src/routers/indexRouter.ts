import { Router } from "express";
import { homePageGet } from "@/controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", homePageGet);

export { indexRouter };
