import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slices/tokenSlice';
import popupReducer from './slices/popupSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    popup: popupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
