"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCards, setTokensByRoundType, placeToken, removeToken } from '../../../../store/slices/tokenSlice';
import { RootState } from '../../../../store';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import CardList from '../../../../components/game/CardList';
import RoundHeader from '../../../../components/game/RoundHeader';
import Button from '../../../../components/shared/Button';
import cardsData from '../../../../../public/data/cards.json';
import { motion } from 'framer-motion';
import { addCardToTempStorage, moveTempToPermanentStorage } from '../../../../utils/localStorage'; // Импортируем функции работы с localStorage

const RoundPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const router = useRouter();
    const { round, selection } = params;
    const tokens = useSelector((state: RootState) => state.token.availableTokens);
    const cards = useSelector((state: RootState) => state.token.cards);

    // Определяем текущий раунд и категории для него
    const currentPreferences = round === "1" ? cardsData.preferences : cardsData.leisureCategories;
    const totalCategories = currentPreferences.length;

    useEffect(() => {
        const selectedCategory = currentPreferences[parseInt(selection) - 1]; // Текущая категория
        const cardNames = selectedCategory?.options.map(option => ({
            name: option.name,
            imagePath: option.imagePath, // Извлекаем путь к изображению из JSON
        }));

        // Инициализируем карточки в Redux только с именем (токены через Redux)
        dispatch(initializeCards(cardNames.map(card => card.name) || []));

        // Устанавливаем токены в зависимости от раунда (обычный или спасение)
        dispatch(setTokensByRoundType({ round: parseInt(round), isRescue: false })); // Здесь round: обычный, не этап спасения
    }, [dispatch, selection, currentPreferences, round]);

    const allTokensPlaced = tokens.first === 0 && tokens.second === 0;

    const handleTokenPlace = (name: string) => {
        const card = cards.find(card => card.name === name);

        if (card?.token !== null) {
            // Удаляем токен с карточки
            dispatch(removeToken(name));
        } else {
            // Устанавливаем токен на карточку
            dispatch(placeToken(name));
        }
    };

    const handleNextClick = () => {
        const nextSelection = parseInt(selection) + 1;

        // Сохраняем карточки текущего раунда в временное хранилище
        cards.forEach(card => {
            const fullCardData = currentPreferences[parseInt(selection) - 1].options.find(option => option.name === card.name);
            addCardToTempStorage({
                name: card.name,
                imagePath: fullCardData ? fullCardData.imagePath : null,
                main: round === "1", // Является ли это первым раундом (preferences)
                category: currentPreferences[parseInt(selection) - 1].category,
                tokenPlaced: card.token !== null, // Установлен ли токен
                score: card.token === 1 ? 3 : card.token === 2 ? 2 : 0,
            });
        });

        if (nextSelection <= totalCategories) {
            // Переходим на следующий минираунд
            router.push(`/round/${round}/${nextSelection}`);
        } else if (round === "1") {
            // Переносим данные из временного хранилища в постоянное после первого раунда
            moveTempToPermanentStorage();
            router.push(`/round/2/1`);
        } else {
            // Переход на этап спасения после 2 и 3 раундов
            router.push(`/round/${round}/rescue`);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header showHomeButton={true} remainingChips={tokens} onReset={() => {}} />

            <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] space-y-8 pt-16 pb-16">
                <RoundHeader
                    roundTitle={`Round ${round}.${selection}`}
                    subtitle={`Please select the ${tokens.first + tokens.second} most preferred options`}
                />

                {/* Передаем карточки с путем к изображению и функцией для установки токена */}
                <CardList
                    category={currentPreferences[parseInt(selection) - 1].category}
                    cards={cards.map(card => ({
                        ...card,
                        imagePath: currentPreferences[parseInt(selection) - 1].options.find(option => option.name === card.name)?.imagePath || ''
                    }))}
                    onTokenPlace={handleTokenPlace}
                />

                <motion.div initial={{ opacity: 0, y: 20 }} animate={allTokensPlaced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.5 }} className="w-full px-8">
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
