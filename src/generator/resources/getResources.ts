import type { GoogleServiceAPIs } from "../../services/google";
import type { ResourceFile } from "../../types/resources";

const ALLOWED_EXTENSION_TYPES = ["pdf", "ipynb"];

async function getResources(api: GoogleServiceAPIs) {
	const drive = api.drive;

	const resources = new Array<ResourceFile>();

	await drive.files
		.list({
			// Query all files within resources folder
			q: `'${process.env.RESOURCES_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder'`,

			// Get ids, names, and links to files
			fields: "files(id, name)",
		})
		.then(async (foldersResponse) => {
			const folders = foldersResponse.data.files;

			if (folders === undefined) {
				console.log("The folders list was empty...");
				return;
			}

			console.log(`Found ${folders.length} folders`);

			async function getResourcesInFolder(category: string, folderId: string) {
				await drive.files
					.list({
						q: `'${folderId}' in parents and trashed = false`,
						fields: "files(id, name, webViewLink, fileExtension, mimeType)",
					})
					.then(async (filesResponse) => {
						const files = filesResponse.data.files;

						if (files === undefined) {
							console.log(
								`The files list was empty for category (${category})`,
							);
							return;
						}

						console.log(`Found ${files.length} files!`);

						for (const file of files) {
							if (
								file.id &&
								file.mimeType === "application/vnd.google-apps.folder"
							) {
								console.log(`Found nested folder (${file.name})`);

								await getResourcesInFolder(category, file.id);
								continue;
							}

							if (
								!file.id ||
								!file.name ||
								!file.webViewLink ||
								!file.fileExtension
							) {
								console.log(
									`File was malformed. (TYPE = ${file.mimeType}, NAME = ${file.name})`,
								);
								continue;
							}

							if (!ALLOWED_EXTENSION_TYPES.includes(file.fileExtension)) {
								continue;
							}

							resources.push({
								thumbnailUrl: file.thumbnailLink ?? "",
								extension: file.fileExtension,
								category: category,
								name: file.name,
								link: file.webViewLink,
								id: file.id,
							});
						}
					});
			}

			for (const folder of folders) {
				if (!folder.name || !folder.id) {
					continue;
				}

				const category = folder.name;

				console.log(`Getting resources in category (${category})`);

				await getResourcesInFolder(category, folder.id);
			}
		});

	return resources;
}

export default getResources;
