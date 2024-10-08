import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
    name: string;
    imagePath: string;
    category: string;
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
        initializeCards: (state, action: PayloadAction<{ name: string; imagePath: string; category: string }[]>) => {
            state.cards = action.payload.map(card => ({
                ...card,
                token: null,
            }));
        },
        initializeRescueCards: (state, action: PayloadAction<{ name: string; imagePath: string; category: string }[]>) => {
            state.cards = action.payload.map(card => ({
                ...card,
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

            card.token = null;
        },
        resetTokens: (state, action: PayloadAction<{ first: number; second: number }>) => {
            state.cards.forEach(card => (card.token = null));
            state.availableTokens.first = action.payload.first;
            state.availableTokens.second = action.payload.second;
        },
        setTokensByRoundType: (state, action: PayloadAction<{ round: number; isRescue: boolean }>) => {
            if (action.payload.isRescue) {
                if (action.payload.round === 2) {
                    state.availableTokens.first = 2;
                    state.availableTokens.second = 2;
                } else if (action.payload.round === 3) {
                    state.availableTokens.first = 1;
                    state.availableTokens.second = 1;
                } else if (action.payload.round === 4) {
                    state.availableTokens.first = 1;
                    state.availableTokens.second = 0;
                }
            } else {
                state.availableTokens.first = 1;
                state.availableTokens.second = 1;
            }
        },
    },
});

export const { initializeCards, initializeRescueCards, placeToken, removeToken, resetTokens, setTokensByRoundType } = tokenSlice.actions;
export default tokenSlice.reducer;
