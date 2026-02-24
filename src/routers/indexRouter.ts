import { Router } from "express";
import {
	dashboardPageGet,
	homePageGet,
} from "@/controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", homePageGet);
indexRouter.get("/dashboard", dashboardPageGet);

export { indexRouter };
