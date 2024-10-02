import axios from 'axios';

const SHEET_ID = 'ваш_идентификатор_таблицы';
const API_KEY = 'ваш_ключ_API';

export const submitToGoogleSheets = async (playerName: string, scores: Record<string, number>) => {
    const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;

    const date = new Date().toLocaleDateString();
    const scoreData = Object.entries(scores).map(([option, score]) => [playerName, date, option, score]);

    try {
        await axios.post(sheetURL, {
            values: scoreData,
        });
    } catch (error) {
        console.error('Error submitting to Google Sheets', error);
    }
};
