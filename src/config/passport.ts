import bcrypt from "bcryptjs";
import passport from "passport";
import LocalStrategy from "passport-local";
import { prisma } from "@/lib/prisma.js";

const LOGIN_ERROR_MESSAGES = {
	username: "Sorry, we couldn't find an account with that username.",
	password: "Sorry, that password isn't right. Please try again.",
} as const;

passport.use(
	new LocalStrategy.Strategy(async (username, password, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: { username },
			});
			if (user === null)
				return done(null, false, { message: LOGIN_ERROR_MESSAGES.username });

			const isPasswordMatching = await bcrypt.compare(password, user.password);
			if (!isPasswordMatching)
				return done(null, false, { message: LOGIN_ERROR_MESSAGES.password });

			return done(null, user);
		} catch (error) {
			return done(error);
		}
	}),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id: string, done) => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		done(null, user);
	} catch (error) {
		done(error);
	}
});

export { passport, LOGIN_ERROR_MESSAGES };
