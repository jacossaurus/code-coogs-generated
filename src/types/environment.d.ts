import type { Credentials } from "google-auth-library";

export declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			GOOGLE_CLIENT_CODE: string;

			GOOGLE_CLIENT_CREDENTIALS?: Credentials;

			SPREADSHEET_ID: string;
			RESOURCES_FOLDER_ID: string;
		}
	}
}
