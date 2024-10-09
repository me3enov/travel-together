import { Card } from '@/types';

export const saveToLocalStorage = (key: string, value: unknown): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export function loadFromLocalStorage(key: string): Card[] | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as Card[]) : null;
  }
  return null;
}

export const moveTempToPermanentStorage = (): void => {
  const tempStorage =
    (loadFromLocalStorage('tempCards') as unknown as Card[]) || [];
  const permanentStorage =
    (loadFromLocalStorage('permanentCards') as unknown as Card[]) || [];

  tempStorage.forEach((tempCard) => {
    const existingCard = permanentStorage.find(
      (permanentCard) => permanentCard.name === tempCard.name,
    );

    if (existingCard) {
      existingCard.score = (existingCard.score || 0) + (tempCard.score || 0);
    } else {
      const { ...newCard } = tempCard;
      permanentStorage.push(newCard);
    }
  });

  saveToLocalStorage('permanentCards', permanentStorage);
  saveToLocalStorage('tempCards', []);
};

export const saveShuffledCardsToStorage = (shuffledCards: Card[]): void => {
  const rounds = [];

  for (let i = 0; i < shuffledCards.length; i += 4) {
    rounds.push({
      category: `all-${Math.ceil((i + 1) / 4)}`,
      options: shuffledCards.slice(i, i + 4),
    });
  }

  saveToLocalStorage('shuffledRounds', rounds);
};

export const loadShuffledRoundsFromStorage = (): unknown => {
  return loadFromLocalStorage('shuffledRounds');
};
