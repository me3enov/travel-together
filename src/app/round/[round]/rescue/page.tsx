"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCards, placeToken, removeToken, setTokensByRoundType } from '../../../../store/slices/tokenSlice';
import { RootState } from '../../../../store';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import CardList from '../../../../components/game/CardList';
import RoundHeader from '../../../../components/game/RoundHeader';
import Button from '../../../../components/shared/Button';
import { loadFromLocalStorage, saveToLocalStorage } from '../../../../utils/localStorage'; // Заменили moveTempToPermanentStorage
import { motion } from 'framer-motion';

const RescuePage = () => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();
    const { round } = params;

    const tokens = useSelector((state: RootState) => state.token.availableTokens);
    const cards = loadFromLocalStorage('tempCards')?.filter((card: any) => !card.tokenPlaced) || [];

    useEffect(() => {
        if (cards) {
            const filteredCards = cards.map((card: any) => card.name);
            dispatch(initializeCards(filteredCards));
        }

        // Устанавливаем токены в зависимости от типа раунда (этап спасения)
        dispatch(setTokensByRoundType({ round: parseInt(round), isRescue: true }));
    }, [dispatch, round]);

    const allTokensPlaced = tokens.first === 0 && tokens.second === 0;

    const handleTokenPlace = (name: string) => {
        const card = cards.find(card => card.name === name);

        if (card?.token !== null) {
            dispatch(removeToken(name));
        } else {
            dispatch(placeToken(name));
        }
    };

    const handleNextClick = () => {
        // Обновляем временное хранилище только для карточек, которые получили токены
        const updatedCards = cards.filter(card => card.token !== null).map(card => ({
            name: card.name,
            token: card.token,
            score: card.token === 1 ? 3 : card.token === 2 ? 2 : 0,
            tokenPlaced: true, // Обновляем, что на карточке установлен токен
        }));

        // Сохраняем обновленные карточки в временное хранилище
        const existingTempCards = loadFromLocalStorage('tempCards') || [];
        const newTempCards = existingTempCards.map((tempCard: any) => {
            const updatedCard = updatedCards.find((card: any) => card.name === tempCard.name);
            return updatedCard ? { ...tempCard, ...updatedCard } : tempCard;
        });

        // Добавляем новые карточки, если их еще нет в хранилище
        const finalTempCards = [...newTempCards, ...updatedCards.filter(card => !newTempCards.some((tempCard: any) => tempCard.name === card.name))];

        saveToLocalStorage('tempCards', finalTempCards);

        // Переход на следующий раунд
        const nextRound = parseInt(round) + 1;
        router.push(`/round/${nextRound}/1`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header showHomeButton={true} remainingChips={tokens} onReset={() => {}} />

            <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] space-y-8 pt-16 pb-16">
                <RoundHeader
                    roundTitle={`Round ${round} - Last chance to save them`}
                    subtitle={tokens.first + tokens.second === 0 ? 'Great!' : `Please select the ${tokens.first + tokens.second} most preferred options`}
                />

                <CardList category="Rescue" cards={cards} onTokenPlace={handleTokenPlace} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
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

export default RescuePage;
