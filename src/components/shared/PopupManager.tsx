"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import Modal from './Modal';
import LoginPopup from '../popups/login/LoginPopup';
import RulesPopup from '../popups/rules/RulesPopup';
import ResetPopup from '../popups/reset/ResetPopup';
import {
    closeAllPopups,
    closeLoginPopup,
    closeRulesPopup,
    closeResetPopup,
    openRulesPopup
} from '../../store/slices/popupSlice';

const PopupManager = () => {
    const dispatch = useDispatch();
    const { isLoginOpen, isRulesOpen, isResetOpen } = useSelector((state: RootState) => state.popup);

    const handleLoginSubmit = (data: { name: string }) => {
        dispatch(closeLoginPopup());
        dispatch(openRulesPopup()); // Открыть окно с правилами
    };

    const handleStartGame = () => {
        dispatch(closeRulesPopup());
        // Логика начала игры
    };

    const handleCloseAll = () => {
        dispatch(closeAllPopups()); // Закрыть все окна
    };

    return (
        <>
            {/* Модальное окно для логина */}
            <Modal isOpen={isLoginOpen} onClose={() => dispatch(closeLoginPopup())}>
                <LoginPopup onSubmit={handleLoginSubmit} />
            </Modal>

            {/* Модальное окно для правил */}
            <Modal isOpen={isRulesOpen} onClose={() => dispatch(closeRulesPopup())}>
                <RulesPopup onStart={handleStartGame} />
            </Modal>

            {/* Модальное окно для сброса */}
            <Modal isOpen={isResetOpen} onClose={() => dispatch(closeResetPopup())}>
                <ResetPopup onClose={handleCloseAll} />
            </Modal>
        </>
    );
};

export default PopupManager;
