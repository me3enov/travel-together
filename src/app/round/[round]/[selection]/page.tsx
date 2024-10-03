"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCards, resetTokens } from '../../../../store/slices/tokenSlice';
import { RootState } from '../../../../store';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import CardList from '../../../../components/game/CardList';
import RoundHeader from '../../../../components/game/RoundHeader';
import Button from '../../../../components/shared/Button';
import { addCard } from '../../../../store/slices/tempStorageSlice'; // Временное хранилище
import { addOrUpdateCards } from '../../../../store/slices/persistentStorageSlice'; // Постоянное хранилище
import cardsData from '../../../../../public/data/cards.json';
import { motion } from 'framer-motion';

const RoundPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const router = useRouter();
    const { round, selection } = params;
    const tokens = useSelector((state: RootState) => state.token.availableTokens);
    const cards = useSelector((state: RootState) => state.token.cards);
    const tempCards = useSelector((state: RootState) => state.tempStorage.cards); // Временное хранилище

    // Определяем текущий раунд и категории для него
    const currentPreferences = round === "1" ? cardsData.preferences : cardsData.leisureCategories;
    const totalCategories = currentPreferences.length;

    useEffect(() => {
        const selectedCategory = currentPreferences[parseInt(selection) - 1]; // Текущая категория
        const cardNames = selectedCategory?.options.map(option => option.name);
        dispatch(initializeCards(cardNames || []));
        dispatch(resetTokens()); // Сбрасываем токены при каждом новом минираунде
    }, [dispatch, selection, currentPreferences]);

    const allTokensPlaced = tokens.first === 0 && tokens.second === 0;

    const handleNextClick = () => {
        const nextSelection = parseInt(selection) + 1;

        // Находим полные данные карточки из currentPreferences для записи в хранилище
        const selectedCategory = currentPreferences[parseInt(selection) - 1]; // Определяем категорию
        cards.forEach(card => {
            // Ищем карточку по имени в данных текущей категории
            const fullCardData = selectedCategory.options.find(option => option.name === card.name);
            dispatch(addCard({
                main: round === "1", // preferences - true, leisureCategories - false
                category: selectedCategory.category, // Используем текущую категорию
                name: card.name,
                imagePath: fullCardData ? fullCardData.imagePath : null, // Обрабатываем imagePath
                token: card.token !== null,
                score: card.token === 1 ? 3 : card.token === 2 ? 2 : 0,
            }));
        });

        // Выводим содержимое временного и постоянного хранилищ в консоль для тестирования
        console.log('Временное хранилище:', tempCards);

        if (nextSelection <= totalCategories) {
            // Переходим на следующий минираунд
            router.push(`/round/${round}/${nextSelection}`);
        } else if (round === "1") {
            // Переход ко 2 раунду после 1, без этапа спасения
            dispatch(addOrUpdateCards(tempCards)); // Переносим временные карточки в постоянное хранилище
            router.push(`/round/2/1`);
        } else {
            // Переход на этап спасения после 2 и 3 раундов
            dispatch(addOrUpdateCards(tempCards)); // Переносим временные карточки в постоянное хранилище
            router.push(`/rescue`);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header showHomeButton={true} remainingChips={tokens} onReset={() => {}} />

            <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] space-y-8 pt-16 pb-16">
                <RoundHeader roundTitle={`Round ${round}.${selection}`} subtitle={currentPreferences[parseInt(selection) - 1].category} />

                <CardList category={currentPreferences[parseInt(selection) - 1].category} cards={currentPreferences[parseInt(selection) - 1].options} />

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
