import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import tokenReducer from './slices/tokenSlice';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        token: tokenReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
