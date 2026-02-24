import type { LOGIN_ERROR_MESSAGES } from "@/config/passport.ts";
import "express-session";

declare module "express-session" {
	interface SessionData {
		messages: (typeof LOGIN_ERROR_MESSAGES)[];
	}
}
