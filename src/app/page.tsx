"use client";

import { useState } from 'react';
import LoginPopup from '../components/login/LoginPopup';
import RulesPopup from '../components/rules/RulesPopup';
import Modal from '../components/shared/Modal';
import Preloader from '../components/preloader/Preloader';

export default function Home() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRulesOpen, setIsRulesOpen] = useState(false);
    const [isStartVisible, setIsStartVisible] = useState(true);

    const handleJoinClick = () => {
        setIsLoginOpen(true);
        setIsStartVisible(false);
    };

    const handleLoginSubmit = (data: { name: string }) => {
        setIsLoginOpen(false);
        setIsRulesOpen(true);
    };

    const handleStartGame = () => {
        setIsRulesOpen(false);
        // Начать игру
    };

    const handleCloseModal = () => {
        setIsLoginOpen(false);
        setIsRulesOpen(false);
        setIsStartVisible(true);
    };

    return (
        <>
            <Preloader onJoin={handleJoinClick} isStartVisible={isStartVisible} />

            <Modal isOpen={isLoginOpen} onClose={handleCloseModal}>
                <LoginPopup onSubmit={handleLoginSubmit} />
            </Modal>

            <Modal isOpen={isRulesOpen} onClose={handleCloseModal}>
                <RulesPopup onStart={handleStartGame} />
            </Modal>
        </>
    );
}
