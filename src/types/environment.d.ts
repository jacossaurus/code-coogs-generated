export declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			GOOGLE_CLIENT_CODE: string;

			GOOGLE_CLIENT_CREDENTIALS: string;

			SPREADSHEET_ID: string;
			RESOURCES_FOLDER_ID: string;
		}
	}
}
