import type { Request, Response } from "express";

const homePageGet = (_req: Request, res: Response) => {
	// TODO: if user is not signed in yet, take user to login page
	// TODO: if user _is_ signed in, then take them to their dashboard
	res.render("pages/index");
};

export { homePageGet };
