import path from "node:path";
import dotenv from "dotenv";
import GoogleService from "./services/google";
import generateResources from "./generator/resources/generateResources";
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

	const generatedDir = path.join(process.cwd(), "include", "generated");

	const generated = {
		resources: await generateResources(generatedDir, apis),
		officers: await generateOfficers(generatedDir, apis),
	};

	console.log("Done!");
}

main();
