import type { Request, Response } from "express";

const homePageGet = (req: Request, res: Response) => {
	if (req.user) res.redirect("/dashboard");
	else res.redirect("/login");
};

export { homePageGet };
