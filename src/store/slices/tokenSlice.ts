import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
    name: string;
    token: 1 | 2 | null;
}

interface TokenState {
    availableTokens: {
        first: number;
        second: number;
    };
    cards: CardState[];
}

const initialState: TokenState = {
    availableTokens: {
        first: 1,
        second: 1,
    },
    cards: [],
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        initializeCards: (state, action: PayloadAction<string[]>) => {
            state.cards = action.payload.map(name => ({
                name,
                token: null,
            }));
        },
        placeToken: (state, action: PayloadAction<string>) => {
            const card = state.cards.find(c => c.name === action.payload);

            if (!card) return;

            if (state.availableTokens.first > 0) {
                card.token = 1;
                state.availableTokens.first -= 1;
            } else if (state.availableTokens.second > 0) {
                card.token = 2;
                state.availableTokens.second -= 1;
            }
        },
        removeToken: (state, action: PayloadAction<string>) => {
            const card = state.cards.find(c => c.name === action.payload);

            if (!card || card.token === null) return;

            if (card.token === 1) {
                state.availableTokens.first += 1;
            } else if (card.token === 2) {
                state.availableTokens.second += 1;
            }

            card.token = null; // Снимаем токен с карточки
        },
    },
});

export const { initializeCards, placeToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
