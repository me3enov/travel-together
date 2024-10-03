import { createSlice } from '@reduxjs/toolkit';

interface RoundState {
    currentRound: number;
    currentSelection: number;
    category: string;
}

const initialState: RoundState = {
    currentRound: 1,
    currentSelection: 1,
    category: 'Location', // Устанавливаем первую категорию по умолчанию
};

const roundSlice = createSlice({
    name: 'round',
    initialState,
    reducers: {
        nextSelection: (state) => {
            // Переход к следующему выбору (мини-раунду)
            state.currentSelection += 1;
        },
        nextRound: (state) => {
            // Переход к следующему раунду
            state.currentRound += 1;
            state.currentSelection = 1; // Сбрасываем счетчик выбора
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        resetRoundState: (state) => {
            // Сбрасываем состояние раунда
            state.currentRound = 1;
            state.currentSelection = 1;
            state.category = 'Location';
        },
    },
});

export const { nextSelection, nextRound, setCategory, resetRoundState } = roundSlice.actions;
export default roundSlice.reducer;
