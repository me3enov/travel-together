// store/slices/persistentStorageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersistentCard {
    main: boolean;
    category: string;
    name: string;
    imagePath: string;
    score: number;
}

interface PersistentStorageState {
    cards: PersistentCard[];
}

const initialState: PersistentStorageState = {
    cards: [],
};

const persistentStorageSlice = createSlice({
    name: 'persistentStorage',
    initialState,
    reducers: {
        addOrUpdateCards: (state, action: PayloadAction<PersistentCard[]>) => {
            action.payload.forEach((newCard) => {
                const existingCard = state.cards.find((card) => card.name === newCard.name);
                if (existingCard) {
                    // Обновляем только score
                    existingCard.score += newCard.score;
                } else {
                    state.cards.push(newCard);
                }
            });
        },
    },
});

export const { addOrUpdateCards } = persistentStorageSlice.actions;
export default persistentStorageSlice.reducer;
