// store/slices/popupSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
    isLoginOpen: boolean;
    isRulesOpen: boolean;
    isResetOpen: boolean;
}

const initialState: PopupState = {
    isLoginOpen: false,
    isRulesOpen: false,
    isResetOpen: false,
};

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        openLoginPopup: (state) => {
            state.isLoginOpen = true;
        },
        closeLoginPopup: (state) => {
            state.isLoginOpen = false;
        },
        openRulesPopup: (state) => {
            state.isRulesOpen = true;
        },
        closeRulesPopup: (state) => {
            state.isRulesOpen = false;
        },
        openResetPopup: (state) => {
            state.isResetOpen = true;
        },
        closeResetPopup: (state) => {
            state.isResetOpen = false;
        },
        closeAllPopups: (state) => {
            state.isLoginOpen = false;
            state.isRulesOpen = false;
            state.isResetOpen = false;
        },
    },
});

export const {
    openLoginPopup,
    closeLoginPopup,
    openRulesPopup,
    closeRulesPopup,
    openResetPopup,
    closeResetPopup,
    closeAllPopups,
} = popupSlice.actions;

export default popupSlice.reducer;
