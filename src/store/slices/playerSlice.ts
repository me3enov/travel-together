import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
    playerName: string;
    tokens: { first: number; second: number };
}

const initialState: PlayerState = {
    playerName: '',
    tokens: { first: 1, second: 1 },
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayerName: (state, action: PayloadAction<string>) => {
            state.playerName = action.payload;
        },
        setTokens: (state, action: PayloadAction<{ first: number; second: number }>) => {
            state.tokens = action.payload;
        },
        resetTokens: (state) => {
            state.tokens = { first: 1, second: 1 };
        },
    },
});

export const { setPlayerName, setTokens, resetTokens } = playerSlice.actions;

export default playerSlice.reducer;
