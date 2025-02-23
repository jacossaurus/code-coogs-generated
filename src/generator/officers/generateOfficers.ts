import path from "node:path";
import { writeFileSync } from "node:fs";
import type { GoogleServiceAPIs } from "../../services/google";
import type { Officer } from "../../types/officers";

async function generateOfficers(outputDir: string, api: GoogleServiceAPIs) {
	const sheets = api.sheets;

	const data = await sheets.spreadsheets.values.batchGetByDataFilter({
		spreadsheetId: process.env.SPREADSHEET_ID,
		requestBody: {
			dataFilters: [
				{
					gridRange: {
						startRowIndex: 0,
						endRowIndex: 100,
						startColumnIndex: 0,
						endColumnIndex: 10,
					},
				},
			],
		},
	});

	const node = (data.data.valueRanges ?? [])[0];
	const range = (node.valueRange?.values ?? []) as Array<Array<string>>;

	const titles = range[0];

	const officers = new Array<Officer>();

	for (const officer of range) {
		if (officer === titles || officer[0] === "") {
			continue;
		}

		officers.push({
			title: officer[0],
			name: officer[1],
			linkedIn: officer[2],
			year: officer[3],
			semester: officer[4],
			imageUrl: officer[5],
		});
	}

	writeFileSync(
		path.join(outputDir, "officers.json"),
		JSON.stringify(officers),
	);
}

export default generateOfficers;
