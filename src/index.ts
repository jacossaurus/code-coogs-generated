import path from "node:path";
import dotenv from "dotenv";
import GoogleService from "./services/google";
import getResources from "./generator/resources/getResources";
import getOfficers from "./generator/officers/getOfficers";
import generateResources from "./generator/resources/generateResources";
import ts from "typescript";
import { writeFileSync } from "node:fs";
import generateOfficers from "./generator/officers/generateOfficers";

dotenv.config();

async function main() {
	const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

	const google = new GoogleService(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

	await google.authenticate(process.env.GOOGLE_CLIENT_CODE);

	const apis = google.apis;

	if (!google.isAuthenticated || apis === undefined) {
		console.error(
			"Failed to generate. Authentication failed or client APIs failed to be created.",
		);

		return;
	}

	console.log("Success! Running generators...");

	const data = {
		resources: await getResources(apis),
		officers: await getOfficers(apis),
	};

	const generatedDir = path.join(process.cwd(), "include", "generated");
	const generatedFiles = {
		resources: await generateResources(data.resources),
		officers: await generateOfficers(data.officers),
	};

	const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

	const contents = {
		resources: printer.printFile(generatedFiles.resources),
		officers: printer.printFile(generatedFiles.officers),
	};

	writeFileSync(path.join(generatedDir, "resources.ts"), contents.resources);
	writeFileSync(path.join(generatedDir, "officers.ts"), contents.officers);
}

main();
