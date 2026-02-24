import bcrypt from "bcryptjs";
import passport from "passport";
import LocalStrategy from "passport-local";
import { prisma } from "@/lib/prisma.js";

passport.use(
	new LocalStrategy.Strategy(async (username, password, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: { username },
			});
			if (user === null)
				return done(null, false, { message: "Username not found" });

			const isPasswordMatching = await bcrypt.compare(password, user.password);
			if (!isPasswordMatching)
				return done(null, false, { message: "Incorrect password" });

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

export default passport;
