import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
    reducer: {
        game: gameReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});
