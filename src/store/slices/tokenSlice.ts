import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardState, TokenState } from '@/types';

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
    initializeCards: (
      state,
      action: PayloadAction<Omit<CardState, 'token'>[]>, // один аргумент — массив карточек
    ) => {
      // обновляем state карточками, добавляем поле token
      state.cards = action.payload.map((card) => ({
        ...card,
        token: null, // устанавливаем token по умолчанию
      }));
    },

    initializeRescueCards: (
      state,
      action: PayloadAction<Omit<CardState, 'token'>[]>,
    ) => {
      state.cards = action.payload.map((card) => ({
        ...card,
        token: null,
      }));
    },
    placeToken: (state, action: PayloadAction<string>) => {
      const card = state.cards.find((c) => c.name === action.payload);

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
      const card = state.cards.find((c) => c.name === action.payload);

      if (!card || card.token === null) return;

      if (card.token === 1) {
        state.availableTokens.first += 1;
      } else if (card.token === 2) {
        state.availableTokens.second += 1;
      }

      card.token = null;
    },

    setTokensByRoundType: (
      state,
      action: PayloadAction<{ round: number; isRescue: boolean }>,
    ) => {
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

export const {
  initializeCards,
  initializeRescueCards,
  placeToken,
  removeToken,
  setTokensByRoundType,
} = tokenSlice.actions;
export default tokenSlice.reducer;
