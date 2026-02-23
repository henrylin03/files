import { Router } from "express";
import { signupGet, signupPost } from "@/controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupGet);
authRouter.post("/signup", ...signupPost);

export { authRouter };
