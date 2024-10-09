"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openLoginPopup } from '../store/slices/popupSlice'; // Импортируем экшен для открытия LoginPopup
import Preloader from '../components/preloader/Preloader';

export default function Home() {
    const dispatch = useDispatch();

    const handleJoinClick = () => {
        dispatch(openLoginPopup()); // Открыть окно LoginPopup при нажатии на Start
    };

    return (
        <Preloader onJoin={handleJoinClick} />
    );
}
