'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeRescueCards,
  setTokensByRoundType,
} from '../../../../store/slices/tokenSlice';
import { RootState } from '../../../../store';
import Cookies from 'js-cookie';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import CardList from '../../../../components/game/CardList';
import RoundHeader from '../../../../components/game/RoundHeader';
import Button from '../../../../components/shared/Button';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../../../../utils/localStorage';
import { motion } from 'framer-motion';
import { Card } from '@/types';

const RescuePage: FC = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const roundParam = Array.isArray(params.round)
    ? params.round[0]
    : params.round;

  const tokens = useSelector((state: RootState) => state.token.availableTokens);
  const cards: Card[] = useSelector((state: RootState) => state.token.cards);
  const [playerName, setPlayerName] = useState<string | null>(null);

  useEffect(() => {
    const nameFromCookie = Cookies.get('playerName');
    if (nameFromCookie) {
      setPlayerName(nameFromCookie);
    }

    const tempCards: Card[] =
      (loadFromLocalStorage('tempCards') as Card[])?.filter(
        (card: Card) => card.tokenPlaced,
      ) || [];
    const filteredCards: Card[] = tempCards.map((card: Card) => ({
      name: card.name,
      imagePath: card.imagePath,
      category: card.category,
    }));

    if (filteredCards.length > 0) {
      dispatch(initializeRescueCards(filteredCards));
    }

    dispatch(
      setTokensByRoundType({ round: parseInt(roundParam), isRescue: true }),
    );
  }, [dispatch, roundParam]);

  const allTokensPlaced = tokens.first === 0 && tokens.second === 0;

  const handleNextClick = () => {
    const existingTempCards: Card[] =
      (loadFromLocalStorage('tempCards') as Card[]) || [];

    const updatedCards: Card[] = cards.map((card) => ({
      name: card.name,
      imagePath: card.imagePath,
      category: card.category,
      tokenPlaced: card.token !== null,
      score: card.token === 1 ? 3 : card.token === 2 ? 2 : 0,
    }));

    const mergedCards = [...existingTempCards, ...updatedCards].reduce(
      (acc: Card[], currentCard: Card) => {
        const existingCardIndex = acc.findIndex(
          (c: Card) => c.name === currentCard.name,
        );

        if (existingCardIndex > -1) {
          if (currentCard.tokenPlaced || !acc[existingCardIndex].tokenPlaced) {
            acc[existingCardIndex] = currentCard;
          }
        } else {
          acc.push(currentCard);
        }

        return acc;
      },
      [] as Card[],
    );

    saveToLocalStorage('tempCards', mergedCards);

    if (parseInt(roundParam) === 4) {
      Cookies.set('gameState', 'completed');
      const finalCards: Card[] =
        (loadFromLocalStorage('tempCards') as Card[]) || [];
      const permanentCards: Card[] = loadFromLocalStorage(
        'permanentCards',
      ) as Card[];
      saveToLocalStorage('permanentCards', [...permanentCards, ...finalCards]);

      window.history.replaceState(null, '', `/result`);
    } else {
      const nextRound = parseInt(roundParam) + 1;
      Cookies.set('currentRound', nextRound.toString());
      Cookies.set('currentSelection', '1');
      Cookies.set('isRescue', 'false');
      window.history.replaceState(null, '', `/round/${nextRound}/1`);
      router.push(`/round/${nextRound}/1`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header showHomeButton={true} onReset={() => {}} />

      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] space-y-8 pt-16 pb-16">
        <RoundHeader
          roundTitle={`Round ${roundParam} - Last chance to save them`}
          subtitle={
            tokens.first + tokens.second === 0
              ? 'Great!'
              : `${playerName}, please select the ${tokens.first + tokens.second} most preferred options`
          }
        />

        <CardList cards={cards} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            allTokensPlaced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="w-full px-8"
        >
          <div
            className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${!allTokensPlaced ? 'invisible' : ''}`}
          >
            <Button
              label="Next"
              onClick={handleNextClick}
              disabled={!allTokensPlaced}
            />
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default RescuePage;
