import type { Request, Response } from "express";

const homePageGet = (req: Request, res: Response) => {
	if (req.user) res.redirect("/folders");
	else res.status(401).redirect("/login");
};

export { homePageGet };
