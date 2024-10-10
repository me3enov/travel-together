interface SheetData {
  playerName: string;
  mainPreferences: Array<{ name: string; score: number }>;
  leisurePreferences: Array<{ name: string; score: number }>;
}

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/library/d/1djQpC8Ct9RZ3CkmPfOHIrppzmqHOd_acMbkhcrEiuPeoZ1t64MUMdlLX/3'; // Вставьте URL Google Apps Script

export const saveToGoogleSheets = async (data: SheetData) => {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при сохранении данных в Google Sheets');
    }
  } catch (error) {
    console.error('Ошибка отправки данных в Google Sheets:', error);
  }
};
