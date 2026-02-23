import { body } from "express-validator";

const ALPHA_ERROR = "must only contain letters.";

const validateSignupForm = [
	body("firstName")
		.trim()
		.isAlpha("en-AU", { ignore: "-" })
		.withMessage(`First name ${ALPHA_ERROR}`)
		.isLength({ min: 2, max: 50 })
		.withMessage("First name must be between 2 and 50 characters"),

	body("lastName")
		.trim()
		.isAlpha("en-AU", { ignore: "-" })
		.withMessage(`Last name ${ALPHA_ERROR}`)
		.isLength({ min: 2, max: 64 })
		.withMessage("Last name must be between 2 and 64 characters"),

	// TODO: check if username is already in use
	body("username")
		.trim()
		.isEmail()
		.withMessage("Please enter a valid email address")
		.isLength({ max: 256 })
		.withMessage("Please enter an email address that is max 256 characters"),

	body("password")
		.isLength({ min: 8, max: 64 })
		.withMessage("Password must be between 8 and 64 characters"),

	body("confirmPassword")
		.custom((value: string, { req }) => value === req.body.password)
		.withMessage("Passwords must match"),
];

export { validateSignupForm };
