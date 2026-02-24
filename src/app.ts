import path from "node:path";
import { Eta } from "eta";
import express from "express";
import buildEtaEngine from "./lib/buildEtaEngine.js";
import "dotenv/config";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import { passport } from "./config/passport.js";
import { prisma } from "./lib/prisma.js";
import { authRouter } from "./routers/authRouter.js";
import { filesRouter } from "./routers/filesRouter.js";
import { indexRouter } from "./routers/indexRouter.js";

const app = express();

const cookieSecret = process.env.COOKIE_SECRET;
if (!cookieSecret)
	throw new Error(
		"COOKIE_SECRET env variable is required for session-based auth",
	);

const currentPath = import.meta.dirname;
const viewsPath = path.join(currentPath, "views");

const eta = new Eta({ views: viewsPath });
app.set("views", viewsPath);
app.set("view engine", "eta");
app.engine("eta", buildEtaEngine(eta));

app.use(express.static(path.join(currentPath, "..", "public")));
app.use(express.urlencoded({ extended: true }));

const prismaSessionStore = new PrismaSessionStore(prisma, {
	checkPeriod: 2 * 60 * 1000, // ms
	dbRecordIdIsSessionId: true,
});

app.use(
	session({
		store: prismaSessionStore,
		secret: cookieSecret,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in ms
		},
	}),
);
app.use(passport.session());
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

/* ROUTES */
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/files", filesRouter);

const PORT = 3000;
app.listen(PORT, (err) => {
	if (err) throw Error;
	console.log(`Listening on port ${PORT}`);
});
