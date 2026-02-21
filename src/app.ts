import path from "node:path";
import { Eta } from "eta";
import express from "express";
import buildEtaEngine from "./lib/buildEtaEngine.js";

const app = express();

const currentPath = import.meta.dirname;

const viewsPath = path.join(currentPath, "views");

const eta = new Eta({ views: viewsPath });
app.set("views", viewsPath);
app.set("view engine", "eta");
app.engine("eta", buildEtaEngine(eta));

app.use(express.static(path.join(currentPath, "..", "public")));
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.get("/", (_req, res) => {
	res.render("index", { name: "henry" });
});

const PORT = 3000;
app.listen(PORT, (err) => {
	if (err) throw Error;
	console.log(`Listening on port ${PORT}`);
});
