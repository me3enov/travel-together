"use client";

import { useDispatch, useSelector } from 'react-redux';
import { resetTokens } from '../../store/slices/playerSlice';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CardList from '../../components/game/CardList';
import cardsData from '../../../public/data/cards.json';
import { RootState } from '../../store';

const RoundPage = () => {
    const dispatch = useDispatch();
    const tokens = useSelector((state: RootState) => state.player.tokens);

    const handleReset = () => {
        dispatch(resetTokens());
    };

    const currentCategory = cardsData.preferences[0];
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] relative">
            <Header showHomeButton={true} remainingChips={tokens} onReset={handleReset} />
            <CardList category={currentCategory.category} cards={currentCategory.options} />
            <Footer />
        </div>
    );
};

export default RoundPage;
