import { google } from 'googleapis';
import { sheets_v4 } from 'googleapis/build/src/apis/sheets';
import { promises as fs } from 'fs';
import path from 'path';

// Загрузка учетных данных сервисного аккаунта
const getAuth = async () => {
    const keyFilePath = path.join(process.cwd(), 'credentials.json');
    const keyFileContent = await fs.readFile(keyFilePath, 'utf8');
    const credentials = JSON.parse(keyFileContent);

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: credentials.client_email,
            private_key: credentials.private_key,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return auth;
};

export const appendDataToSheet = async (spreadsheetId: string, range: string, values: any[]) => {
    const auth = await getAuth();
    const sheets = google.sheets({ version: 'v4', auth }) as sheets_v4.Sheets;

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {
            values,
        },
    });
};
