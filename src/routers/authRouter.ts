import { Router } from "express";
import {
	loginGet,
	signupGet,
	signupPost,
} from "@/controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupGet);
authRouter.post("/signup", ...signupPost);

authRouter.get("/login", loginGet);

export { authRouter };
