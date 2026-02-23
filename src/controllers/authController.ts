import type { Request, Response } from "express";

const signupGet = (_req: Request, res: Response) => {
	res.render("pages/signup", { title: "Sign up" });
};

export { signupGet };
