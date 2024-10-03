import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import tokenReducer from './slices/tokenSlice';
import roundReducer from './slices/roundSlice';
import tempStorageReducer from './slices/tempStorageSlice'; // Добавляем временное хранилище
import persistentStorageReducer from './slices/persistentStorageSlice'; // Добавляем постоянное хранилище

export const store = configureStore({
    reducer: {
        player: playerReducer,
        token: tokenReducer,
        round: roundReducer,
        tempStorage: tempStorageReducer, // Регистрируем временное хранилище
        persistentStorage: persistentStorageReducer, // Регистрируем постоянное хранилище
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
``
