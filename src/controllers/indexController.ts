import type { Request, Response } from "express";

const homePageGet = (_req: Request, res: Response) => {
	res.render("index");
};

export { homePageGet };
