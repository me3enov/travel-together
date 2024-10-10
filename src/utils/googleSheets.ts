interface SheetData {
  playerName: string;
  mainPreferences: Array<{ name: string; score: number }>;
  leisurePreferences: Array<{ name: string; score: number }>;
}

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyu_QvNynTLd7Axt2G_tZzrG6nRTVMjV57ysvCIgD31itu6znnOkajS97FzZ0-oa_As/exec';

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
    // eslint-disable-next-line no-console
    console.error('Ошибка отправки данных в Google Sheets:', error);
  }
};
