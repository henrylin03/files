import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { prisma } from "@/lib/prisma.js";
import { validateSignupForm } from "@/lib/validationUtils.js";

const signupGet = async (_req: Request, res: Response) => {
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

export { signupGet, signupPost };
