import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCards, placeToken, removeToken, setTokensByRoundType } from '../store/slices/tokenSlice';
import { RootState } from '../store';
import { loadFromLocalStorage, moveTempToPermanentStorage, saveShuffledCardsToStorage, loadShuffledRoundsFromStorage } from '../utils/localStorage';
import cardsData from '../../public/data/cards.json';

interface RoundLogicProps {
    round: string;
    selection: string;
}

export const useRoundLogic = ({ round, selection }: RoundLogicProps) => {
    const dispatch = useDispatch();
    const [shuffledCards, setShuffledCards] = useState<any[]>([]);
    const tokens = useSelector((state: RootState) => state.token.availableTokens);
    const cards = useSelector((state: RootState) => state.token.cards);

    const currentPreferences = {
        1: cardsData.preferences,
        2: cardsData.leisureCategories,
    }[parseInt(round)] || [];

    const getCardData = (selection: string, isShuffled: boolean = false) => {
        const dataSource = isShuffled ? shuffledCards : currentPreferences[parseInt(selection) - 1]?.options;
        return dataSource?.map((card: any) => ({
            name: card.name,
            imagePath: card.imagePath,
            category: isShuffled ? 'Mixed' : currentPreferences[parseInt(selection) - 1]?.category,
        })) || [];
    };

    useEffect(() => {
        const updateCardsState = (cardData: any[], isRescue: boolean) => {
            dispatch(initializeCards(cardData));
            dispatch(setTokensByRoundType({ round: parseInt(round), isRescue }));
        };

        const shuffledRounds = loadShuffledRoundsFromStorage();
        const isRescue = false;
        const tempCards = loadFromLocalStorage('tempCards');

        const cardData = parseInt(round) < 3
            ? getCardData(selection)
            : (shuffledRounds.length
                ? getCardData(selection, true)
                : getShuffledCardsData(tempCards));

        updateCardsState(cardData, isRescue);
    }, [dispatch, selection, round]);

    const getShuffledCardsData = (tempCards: any) => {
        const shuffled = [...(tempCards?.filter((card: any) => card.tokenPlaced) || [])].sort(() => 0.5 - Math.random());
        saveShuffledCardsToStorage(shuffled);
        setShuffledCards(shuffled);
        return shuffled;
    };

    const handleTokenPlace = (name: string) => {
        const card = cards.find(card => card.name === name);
        card?.token !== null ? dispatch(removeToken(name)) : dispatch(placeToken(name));
    };

    const moveTempCardsToPermanent = () => {
        moveTempToPermanentStorage();
    };

    return { tokens, cards, handleTokenPlace, currentPreferences, shuffledCards, moveTempCardsToPermanent };
};
