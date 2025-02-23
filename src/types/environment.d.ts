export declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			GOOGLE_CLIENT_CODE: string;
			REDIRECT_URI: string;

			SPREADSHEET_ID: string;
			RESOURCES_FOLDER_ID: string;
		}
	}
}
