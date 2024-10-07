// utils/localStorage.ts

export const saveToLocalStorage = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const loadFromLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        const savedData = localStorage.getItem(key);
        return savedData ? JSON.parse(savedData) : null;
    }
    return null;
};

export const addCardToTempStorage = (card: any) => {
    const tempStorage = loadFromLocalStorage('tempCards') || [];
    tempStorage.push(card);
    saveToLocalStorage('tempCards', tempStorage);
};

export const moveTempToPermanentStorage = () => {
    const tempStorage = loadFromLocalStorage('tempCards') || [];
    const permanentStorage = loadFromLocalStorage('permanentCards') || [];

    tempStorage.forEach((tempCard: any) => {
        const existingCard = permanentStorage.find((permanentCard: any) => permanentCard.name === tempCard.name);

        if (existingCard) {
            // Суммируем баллы
            existingCard.score += tempCard.score;
        } else {
            // Добавляем новую карточку
            const { token, ...newCard } = tempCard; // Удаляем поле 'token'
            permanentStorage.push(newCard);
        }
    });

    // Сохраняем обновленные данные в постоянное хранилище
    saveToLocalStorage('permanentCards', permanentStorage);

    // Очищаем временное хранилище
    saveToLocalStorage('tempCards', []);
};

// Функция для сохранения перемешанных карточек
export const saveShuffledCardsToStorage = (shuffledCards: any[]) => {
    const rounds = [];

    // Разбиваем перемешанные карточки на минираунды по 4 карточки
    for (let i = 0; i < shuffledCards.length; i += 4) {
        rounds.push({
            category: `all-${Math.ceil((i + 1) / 4)}`, // Генерируем категорию для каждого минираунда
            options: shuffledCards.slice(i, i + 4),
        });
    }

    saveToLocalStorage('shuffledRounds', rounds);
};

// Загрузка перемешанных карточек
export const loadShuffledRoundsFromStorage = () => {
    return loadFromLocalStorage('shuffledRounds');
};
