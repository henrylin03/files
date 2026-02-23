import { Router } from "express";
import { signupGet } from "@/controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupGet);

export { authRouter };
