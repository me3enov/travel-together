"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCards } from '../../store/slices/tokenSlice'; // Экшен для инициализации карточек
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CardList from '../../components/game/CardList';
import cardsData from '../../../public/data/cards.json'; // JSON с карточками
import { RootState } from '../../store';

const RoundPage = () => {
    const dispatch = useDispatch();
    const tokens = useSelector((state: RootState) => state.token.availableTokens);

    useEffect(() => {
        // Инициализируем карточки при первом рендере
        const cardNames = cardsData.preferences[0].options.map(option => option.name);
        dispatch(initializeCards(cardNames));
    }, [dispatch]);

    const currentCategory = cardsData.preferences[0]; // Пример выбора категории для первого раунда

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] relative">
            <Header showHomeButton={true} remainingChips={tokens} onReset={() => {}} />

            <CardList category={currentCategory.category} cards={currentCategory.options} />

            <Footer />
        </div>
    );
};

export default RoundPage;
