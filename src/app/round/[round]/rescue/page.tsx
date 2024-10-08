"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { initializeRescueCards, placeToken, removeToken, setTokensByRoundType } from '../../../../store/slices/tokenSlice';
import { RootState } from '../../../../store';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import CardList from '../../../../components/game/CardList';
import RoundHeader from '../../../../components/game/RoundHeader';
import Button from '../../../../components/shared/Button';
import {loadFromLocalStorage, loadShuffledRoundsFromStorage, saveToLocalStorage} from '../../../../utils/localStorage';
import { motion } from 'framer-motion';

const RescuePage = () => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();
    const { round } = params;

    const tokens = useSelector((state: RootState) => state.token.availableTokens);
    const cards = useSelector((state: RootState) => state.token.cards);

    useEffect(() => {
        const tmp = loadFromLocalStorage('tempCards');
        const sh = loadShuffledRoundsFromStorage();
        const pe = loadFromLocalStorage('permanentCards');
        console.log('временное: ', {round, tmp});
        console.log('шафл: ', {round, sh});
        console.log('постоянное: ', {round, pe});
        console.log('Карточки: ', {cards});
        // Загружаем карточки, которые не были выбраны в предыдущих раундах
        const tempCards = loadFromLocalStorage('tempCards')?.filter((card: any) => !card.tokenPlaced) || [];
        const filteredCards = tempCards.map((card: any) => ({
            name: card.name,
            imagePath: card.imagePath,
            category: card.category
        }));

        if (filteredCards.length > 0) {
            dispatch(initializeRescueCards(filteredCards));
        }

        // Устанавливаем токены для этапа спасения
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
        // Загружаем текущие карточки из временного хранилища
        const existingTempCards = loadFromLocalStorage('tempCards') || [];

        // Создаем новую структуру карточек для обновления хранилища
        const updatedCards = cards.map(card => ({
            name: card.name,
            imagePath: card.imagePath,
            category: card.category,
            tokenPlaced: card.token !== null,
            score: card.token === 1 ? 3 : card.token === 2 ? 2 : 0,
        }));

        // Объединяем существующие карточки с новыми и удаляем дубли
        const mergedCards = [...existingTempCards, ...updatedCards].reduce((acc, currentCard) => {
            const existingCardIndex = acc.findIndex(c => c.name === currentCard.name);

            if (existingCardIndex > -1) {
                // Если есть дубли по имени, оставляем карточку с `tokenPlaced = true`
                if (currentCard.tokenPlaced || !acc[existingCardIndex].tokenPlaced) {
                    acc[existingCardIndex] = currentCard;
                }
            } else {
                acc.push(currentCard);
            }

            return acc;
        }, [] as any[]);

        // Сохраняем уникальные карточки во временное хранилище
        saveToLocalStorage('tempCards', mergedCards);

        // Проверяем, является ли это последний раунд (4-й раунд)
        if (parseInt(round) === 4) {
            // Переносим все карточки из временного хранилища в постоянное
            const finalCards = loadFromLocalStorage('tempCards') || [];
            const permanentCards = loadFromLocalStorage('permanentCards') || [];
            saveToLocalStorage('permanentCards', [...permanentCards, ...finalCards]);

            // Очищаем временное хранилище
            saveToLocalStorage('tempCards', []);

            // Переход на страницу результатов
            router.push('/result');
        } else {
            // Переход на следующий раунд, если это не последний раунд
            const nextRound = parseInt(round) + 1;
            router.push(`/round/${nextRound}/1`);
        }
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
