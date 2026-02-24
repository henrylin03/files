import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { passport } from "@/config/passport.js";
import { prisma } from "@/lib/prisma.js";
import { validateSignupForm } from "@/lib/validationUtils.js";

const loginGet = async (req: Request, res: Response) => {
	if (req.user) return res.redirect("/dashboard");

	const { session } = req;
	if (!session.messages || !session.messages.length)
		return res.render("pages/login", { title: "Log in" });

	const loginErrorMessage = session.messages.at(-1);
	res.render("pages/login", { title: "Log in", error: loginErrorMessage });
};

const loginPost = passport.authenticate("local", {
	successRedirect: "/dashboard",
	failureRedirect: "/login",
	failureMessage: true,
});

const signupGet = async (req: Request, res: Response) => {
	if (req.user) return res.redirect("/dashboard");

	res.render("pages/signup", { title: "Sign up" });
};

const signupPost = [
	validateSignupForm,
	async (req: Request, res: Response) => {
		const formData = matchedData(req, {
			onlyValidData: false,
		});
		const { firstName, lastName, username } = formData;

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).render("pages/signup", {
				errors: errors.array(),
				firstName,
				lastName,
				username,
			});

		const { password } = formData;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		await prisma.user.create({
			data: {
				firstName,
				lastName,
				username,
				password: hashedPassword,
			},
		});

		res.redirect("/");
	},
];

export { loginGet, loginPost, signupGet, signupPost };
