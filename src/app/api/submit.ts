// app/api/submit/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = 'your_spreadsheet_id'; // ID вашей таблицы

// Аутентификация Google Sheets API через OAuth2
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Это нужно для корректной работы ключа
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function POST(request: Request) {
    const { playerName, mainPreferences, leisurePreferences } = await request.json();

    try {
        const sheets = google.sheets({ version: 'v4', auth });
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A1', // Укажите нужный диапазон
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [`Player Name: ${playerName}`], // Имя игрока
                    ['Main Preferences'], // Заголовок секции
                    ...mainPreferences.map((card: any) => [card.name, card.score]), // Карточки предпочтений
                    ['Leisure Preferences'], // Заголовок секции
                    ...leisurePreferences.map((card: any) => [card.name, card.score]), // Карточки досуга
                    ['', ''], // Пустая строка для разделения записей
                ],
            },
        });

        return NextResponse.json({ status: 'success', result });
    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        return NextResponse.json({ status: 'error', error });
    }
}
