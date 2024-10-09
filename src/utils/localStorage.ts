export const saveToLocalStorage = (key: string, value: unknown): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const loadFromLocalStorage = (key: string): unknown | null => {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  }
  return null;
};

export const moveTempToPermanentStorage = (): void => {
  const tempStorage =
    (loadFromLocalStorage('tempCards') as Record<string, unknown>[]) || [];
  const permanentStorage =
    (loadFromLocalStorage('permanentCards') as Record<string, unknown>[]) || [];

  tempStorage.forEach((tempCard) => {
    const existingCard = permanentStorage.find(
      (permanentCard) => permanentCard.name === tempCard.name,
    );

    if (existingCard) {
      existingCard.score =
        (existingCard.score as number) + (tempCard.score as number);
    } else {
      const { ...newCard } = tempCard;
      permanentStorage.push(newCard);
    }
  });

  saveToLocalStorage('permanentCards', permanentStorage);
  saveToLocalStorage('tempCards', []);
};

export const saveShuffledCardsToStorage = (
  shuffledCards: Record<string, unknown>[],
): void => {
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
