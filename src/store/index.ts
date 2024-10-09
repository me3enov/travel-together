import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slices/tokenSlice';
import popupReducer from './slices/popupSlice'; // Импортируем редьюсер для управления попапами

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        popup: popupReducer, // Добавляем редьюсер для попапов
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
