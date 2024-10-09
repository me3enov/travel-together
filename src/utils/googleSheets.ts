import axios from 'axios';

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const GOOGLE_SHEETS_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:append`;

interface SheetData {
    playerName: string;
    preferences: string[];
    timestamp: string;
}

export const saveToGoogleSheets = async (data: SheetData) => {
    const sheetRange = 'Sheet1!A:D'; // Область данных в таблице
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

    const rowData = [
        data.playerName,
        data.preferences.join(', '),
        new Date(data.timestamp).toISOString(),
    ];

    try {
        await axios.post(
            `${GOOGLE_SHEETS_API_URL}?key=${apiKey}`,
            {
                range: sheetRange,
                majorDimension: 'ROWS',
                values: [rowData],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
    }
};
