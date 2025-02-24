import type { GoogleServiceAPIs } from "../../services/google";
import type { Officer } from "../../types/officers";

const NUM_FIELDS = 6;

async function getOfficers(api: GoogleServiceAPIs) {
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
		if (officer === titles || officer[0] === "" || !officer[0]) {
			continue;
		}

		// Make sure all values are defined. Otherwise, build will fail.
		for (let i = 0; i < NUM_FIELDS; i++) {
			officer[i] = officer[i] ?? "";
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

	return officers;
}

export default getOfficers;
