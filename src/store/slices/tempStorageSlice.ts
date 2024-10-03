// store/slices/tempStorageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TempCard {
    main: boolean;
    category: string;
    name: string;
    imagePath: string;
    token: boolean;
    score: number;
}

interface TempStorageState {
    cards: TempCard[];
}

const initialState: TempStorageState = {
    cards: [],
};

const tempStorageSlice = createSlice({
    name: 'tempStorage',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<TempCard>) => {
            state.cards.push(action.payload);
        },
        updateCardToken: (state, action: PayloadAction<{ name: string; token: 1 | 2 | null }>) => {
            const card = state.cards.find((card) => card.name === action.payload.name);
            if (card) {
                card.token = action.payload.token !== null;
                if (action.payload.token === 1) {
                    card.score += 3;
                } else if (action.payload.token === 2) {
                    card.score += 2;
                }
            }
        },
        resetTempStorage: (state) => {
            state.cards = [];
        },
    },
});

export const { addCard, updateCardToken, resetTempStorage } = tempStorageSlice.actions;
export default tempStorageSlice.reducer;
