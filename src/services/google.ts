import fs from "node:fs";
import { type Credentials, OAuth2Client } from "google-auth-library";
import { drive_v3, gmail_v1, GoogleApis, sheets_v4 } from "googleapis";
import path from "node:path";

export interface GoogleServiceAPIs {
	sheets: sheets_v4.Sheets;
	gmail: gmail_v1.Gmail;
	drive: drive_v3.Drive;
}

class GoogleService {
	private client: OAuth2Client;
	public apis?: GoogleServiceAPIs;

	public isAuthenticated = false;

	constructor(id: string, secret: string) {
		console.log("Creating OAuth2 Client");

		this.client = new OAuth2Client({
			clientId: id,
			clientSecret: secret,
			redirectUri: "http://localhost:3000/oauth-callback",
		});
	}

	// Authentication
	public async authenticate(code?: string) {
		console.log("Attempting to authenticate");

		try {
			let credentials: Credentials | undefined;

			const stored = process.env.GOOGLE_CLIENT_CREDENTIALS;

			if (stored && stored !== "") {
				credentials = JSON.parse(stored) as Credentials;
			} else {
				credentials = JSON.parse(
					fs
						.readFileSync(path.join(process.cwd(), "credentials.json"))
						.toString(),
				) as Credentials;
			}

			if (credentials.access_token !== undefined) {
				this.loadCredentials(credentials);

				return this.isAuthenticated;
			}
		} catch {
			console.warn("Failed to authenticate with stored credentials.");
		}

		if (code !== undefined) {
			await this.loadToken(code);

			return this.isAuthenticated;
		}

		const authUrl = this.client.generateAuthUrl({
			access_type: "offline",
			prompt: "consent",
			scope: [
				"https://www.googleapis.com/auth/spreadsheets",
				"https://www.googleapis.com/auth/drive",
				"https://www.googleapis.com/auth/gmail",
			],
		});

		console.log(`Authorize Drive class: ${authUrl}`);

		return this.isAuthenticated;
	}

	private async loadToken(code: string) {
		console.log(`Attempting to load tokens with code: ${code}`);

		const { tokens } = await this.client.getToken(code);

		fs.writeFileSync("credentials.json", JSON.stringify(tokens));

		this.loadCredentials(tokens);
	}

	private async loadCredentials(credentials: Credentials) {
		this.client.setCredentials(credentials);
		this.isAuthenticated = true;

		console.log("Client has been authenticated");

		this.createAPIs();
	}

	private async createAPIs() {
		if (this.apis !== undefined) {
			console.error(
				"Failed to create Drive API: Client Drive API already exists",
			);
			return;
		}

		this.apis = {
			sheets: new sheets_v4.Sheets({
				apiVersion: "v4",
				auth: this.client,
			}),
			gmail: new gmail_v1.Gmail({
				apiVersion: "v1",
				auth: this.client,
			}),
			drive: new drive_v3.Drive({
				apiVersion: "v3",
				auth: this.client,
			}),
		};

		console.log("Client APIs created");
	}
}

export default GoogleService;
