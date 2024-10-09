'use client';

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
  openRulesPopup,
} from '../../store/slices/popupSlice';

const PopupManager: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoginOpen, isRulesOpen, isResetOpen } = useSelector(
    (state: RootState) => state.popup,
  );

  const handleLoginSubmit = (): void => {
    dispatch(closeLoginPopup());
    dispatch(openRulesPopup());
  };

  const handleStartGame = (): void => {
    dispatch(closeRulesPopup());
  };

  const handleCloseAll = (): void => {
    dispatch(closeAllPopups());
  };

  return (
    <>
      <Modal isOpen={isLoginOpen} onClose={() => dispatch(closeLoginPopup())}>
        <LoginPopup onSubmit={handleLoginSubmit} />
      </Modal>

      <Modal isOpen={isRulesOpen} onClose={() => dispatch(closeRulesPopup())}>
        <RulesPopup onStart={handleStartGame} />
      </Modal>

      <Modal isOpen={isResetOpen} onClose={() => dispatch(closeResetPopup())}>
        <ResetPopup onClose={handleCloseAll} />
      </Modal>
    </>
  );
};

export default PopupManager;
