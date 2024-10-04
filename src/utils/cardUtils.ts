// utils/cardUtils.ts

import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

export interface Card {
    name: string;
    imagePath: string | null;
    main: boolean;
    category: string;
    tokenPlaced: boolean;
    score: number;
}

export const getCardsFromStorage = (storageKey: string): Card[] => {
    return loadFromLocalStorage(storageKey) || [];
};

export const saveCardToStorage = (storageKey: string, card: Card): void => {
    const cards = getCardsFromStorage(storageKey);
    cards.push(card);
    saveToLocalStorage(storageKey, cards);
};

export const moveTempToPermanentStorage = (): void => {
    const tempStorage = getCardsFromStorage('tempCards');
    const permanentStorage = getCardsFromStorage('permanentCards');

    tempStorage.forEach(tempCard => {
        const existingCard = permanentStorage.find(card => card.name === tempCard.name);
        if (existingCard) {
            existingCard.score += tempCard.score;
        } else {
            permanentStorage.push(tempCard);
        }
    });

    saveToLocalStorage('permanentCards', permanentStorage);
    saveToLocalStorage('tempCards', []);
};
