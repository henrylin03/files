import type { Request, Response } from "express";

const homePageGet = (req: Request, res: Response) => {
	if (req.user) res.redirect("/dashboard");
	else res.redirect("/login");
};

const dashboardPageGet = (req: Request, res: Response) => {
	if (!req.user) return res.redirect("/login");
	res.render("pages/dashboard", { title: "All files & folders" });
};

export { homePageGet, dashboardPageGet };
