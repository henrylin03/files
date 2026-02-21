import type { Eta } from "eta";

type RenderCallbackFunction = (error: Error | null, rendered?: string) => void;

const buildEtaEngine =
	(eta: Eta) =>
	(path: string, opts: object, callback: RenderCallbackFunction) => {
		try {
			const fileContent = eta.readFile(path);
			const renderedView = eta.renderString(fileContent, opts);

			callback(null, renderedView);
		} catch (error) {
			if (error instanceof Error) callback(error);
		}
	};

export default buildEtaEngine;
