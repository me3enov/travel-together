"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCards } from '../../store/slices/tokenSlice';
import { RootState } from '../../store';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CardList from '../../components/game/CardList';
import RoundHeader from '../../components/game/RoundHeader';
import Button from '../../components/shared/Button';
import cardsData from '../../../public/data/cards.json';
import { motion } from 'framer-motion';

const RoundPage = () => {
    const dispatch = useDispatch();
    const tokens = useSelector((state: RootState) => state.token.availableTokens);
    const { currentRound, currentSelection, category } = useSelector((state: RootState) => state.round);
    const cards = useSelector((state: RootState) => state.token.cards);

    useEffect(() => {
        const cardNames = cardsData.preferences[0].options.map(option => option.name);
        dispatch(initializeCards(cardNames));
    }, [dispatch]);

    // Проверяем, что все токены были расставлены (нет токенов для размещения)
    const allTokensPlaced = tokens.first === 0 && tokens.second === 0;

    const handleNextClick = () => {
        console.log("Next clicked");
        // Логика перехода к следующему раунду
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header showHomeButton={true} remainingChips={tokens} onReset={() => {}} />

            {/* Контентная часть, которая будет заполнять оставшееся пространство */}
            <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] space-y-8 pt-16 pb-16">
                <RoundHeader
                    roundTitle={`Round ${currentRound}.${currentSelection}`}
                    subtitle={category}
                />

                <CardList category={category} cards={cardsData.preferences[0].options} />

                {/* Кнопка всегда находится в DOM, но скрыта, если все токены не расставлены */}
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={allTokensPlaced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full px-8"
                >
                    <div className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${!allTokensPlaced ? 'invisible' : ''}`}>
                        <Button label="Next" onClick={handleNextClick} />
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default RoundPage;
