import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
    playerName: string;
    scores: Record<string, number>;
    currentRound: number;
    isGameFinished: boolean;
}

const initialState: GameState = {
    playerName: '',
    scores: {},
    currentRound: 1,
    isGameFinished: false,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setPlayerName: (state, action: PayloadAction<string>) => {
            state.playerName = action.payload;
        },
        updateScore: (state, action: PayloadAction<{ option: string; score: number }>) => {
            state.scores[action.payload.option] = action.payload.score;
        },
        nextRound: (state) => {
            state.currentRound += 1;
        },
        resetGame: (state) => {
            state.playerName = '';
            state.scores = {};
            state.currentRound = 1;
            state.isGameFinished = false;
        },
        finishGame: (state) => {
            state.isGameFinished = true;
        },
    },
});

export const { setPlayerName, updateScore, nextRound, resetGame, finishGame } = gameSlice.actions;

export default gameSlice.reducer;
