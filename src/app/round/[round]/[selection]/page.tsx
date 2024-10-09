'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeCards,
  setTokensByRoundType,
} from '../../../../store/slices/tokenSlice';
import { RootState } from '../../../../store';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import CardList from '../../../../components/game/CardList';
import RoundHeader from '../../../../components/game/RoundHeader';
import Button from '../../../../components/shared/Button';
import cardsData from '../../../../../public/data/cards.json';
import Cookies from 'js-cookie';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  moveTempToPermanentStorage,
  saveShuffledCardsToStorage,
  loadShuffledRoundsFromStorage,
} from '../../../../utils/localStorage';
import { motion } from 'framer-motion';
import { Card, Option, ShuffledRound } from '@/types';

const RoundPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();

  // Проверка на массив и приведение к строке
  const roundParam = Array.isArray(params.round)
    ? params.round[0]
    : params.round;
  const selectionParam = Array.isArray(params.selection)
    ? params.selection[0]
    : params.selection;

  const tokens = useSelector((state: RootState) => state.token.availableTokens);
  const cards: Card[] = useSelector((state: RootState) => state.token.cards);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);

  const currentPreferences =
    roundParam === '1' ? cardsData.preferences : cardsData.leisureCategories;

  useEffect(() => {
    const nameFromCookie = Cookies.get('playerName');
    if (nameFromCookie) {
      setPlayerName(nameFromCookie);
    }
    if (roundParam === '1' || roundParam === '2') {
      const selectedCategory = currentPreferences[parseInt(selectionParam) - 1];
      const cardData = selectedCategory?.options.map((option: Option) => ({
        name: option.name,
        imagePath: option.imagePath,
        category: selectedCategory.category,
      }));
      dispatch(initializeCards(cardData || []));
    } else {
      let shuffledRounds: ShuffledRound[] = Array.isArray(
        loadShuffledRoundsFromStorage(),
      )
        ? (loadShuffledRoundsFromStorage() as ShuffledRound[])
        : [];

      if (selectionParam === '1') {
        saveToLocalStorage('shuffledRounds', []);
        shuffledRounds = [];
      }

      if (!shuffledRounds || shuffledRounds.length === 0) {
        const tempCards: Card[] =
          (loadFromLocalStorage('tempCards') as Card[])?.filter(
            (card: Card) => card.tokenPlaced,
          ) || [];

        const shuffled = [...tempCards].sort(() => 0.5 - Math.random());

        saveShuffledCardsToStorage(shuffled);
        shuffledRounds = loadShuffledRoundsFromStorage() as ShuffledRound[];
      }

      const currentRound = shuffledRounds[parseInt(selectionParam) - 1];
      dispatch(
        initializeCards(
          currentRound.options.map((card: Card) => ({
            name: card.name,
            imagePath: card.imagePath,
            category: 'Mixed',
          })),
        ),
      );
      setShuffledCards(currentRound.options);
    }

    // Передача корректного типа аргумента
    dispatch(
      setTokensByRoundType({ round: parseInt(roundParam), isRescue: false }),
    );
  }, [dispatch, selectionParam, currentPreferences, roundParam]);

  const allTokensPlaced = tokens.first === 0 && tokens.second === 0;

  const handleNextClick = () => {
    const nextSelection = parseInt(selectionParam) + 1;
    const shuffledRounds: ShuffledRound[] = Array.isArray(
      loadShuffledRoundsFromStorage(),
    )
      ? (loadShuffledRoundsFromStorage() as ShuffledRound[])
      : [];

    if (selectionParam === '1') {
      moveTempToPermanentStorage();
      saveToLocalStorage('tempCards', []);
    }

    cards.forEach((card) => {
      const fullCardData: Option | undefined =
        roundParam === '1' || roundParam === '2'
          ? currentPreferences[parseInt(selectionParam) - 1]?.options?.find(
              (option: Option) => option.name === card.name,
            )
          : shuffledCards.find(
              (shuffledCard) => shuffledCard.name === card.name,
            );

      const newCard: Card = {
        name: card.name,
        imagePath: fullCardData?.imagePath || '',
        main: roundParam === '1',
        category:
          currentPreferences[parseInt(selectionParam) - 1]?.category || '',
        tokenPlaced: card.token !== null,
        score: card.token === 1 ? 3 : card.token === 2 ? 2 : 0,
      };

      const existingTempCards: Card[] = Array.isArray(
        loadFromLocalStorage('tempCards'),
      )
        ? (loadFromLocalStorage('tempCards') as Card[])
        : [];

      saveToLocalStorage('tempCards', [...existingTempCards, newCard]);
    });

    if (roundParam === '1') {
      if (nextSelection <= currentPreferences.length) {
        Cookies.set('currentRound', roundParam);
        Cookies.set('currentSelection', nextSelection.toString());
        Cookies.set('isRescue', 'false');
        window.history.replaceState(
          null,
          '',
          `/round/${roundParam}/${nextSelection}`,
        );
        router.push(`/round/${roundParam}/${nextSelection}`);
      } else {
        Cookies.set('currentRound', '2');
        Cookies.set('currentSelection', '1');
        Cookies.set('isRescue', 'false');
        window.history.replaceState(null, '', `/round/2/1`);
        router.push(`/round/2/1`);
      }
    } else if (roundParam === '2') {
      if (nextSelection <= currentPreferences.length) {
        Cookies.set('currentRound', roundParam);
        Cookies.set('currentSelection', nextSelection.toString());
        Cookies.set('isRescue', 'false');
        window.history.replaceState(
          null,
          '',
          `/round/${roundParam}/${nextSelection}`,
        );
        router.push(`/round/${roundParam}/${nextSelection}`);
      } else {
        Cookies.set('currentRound', roundParam);
        Cookies.set('currentSelection', 'rescue');
        Cookies.set('isRescue', 'true');
        window.history.replaceState(null, '', `/round/${roundParam}/rescue`);
        router.push(`/round/${roundParam}/rescue`);
      }
    } else {
      if (nextSelection <= shuffledRounds.length) {
        Cookies.set('currentRound', roundParam);
        Cookies.set('currentSelection', nextSelection.toString());
        Cookies.set('isRescue', 'false');
        window.history.replaceState(
          null,
          '',
          `/round/${roundParam}/${nextSelection}`,
        );
        router.push(`/round/${roundParam}/${nextSelection}`);
      } else {
        Cookies.set('currentRound', roundParam);
        Cookies.set('currentSelection', 'rescue');
        Cookies.set('isRescue', 'true');
        window.history.replaceState(null, '', `/round/${roundParam}/rescue`);
        router.push(`/round/${roundParam}/rescue`);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header showHomeButton={true} />

      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] space-y-8 pt-16 pb-16">
        <RoundHeader
          roundTitle={`Round ${roundParam}.${selectionParam}`}
          subtitle={
            tokens.first + tokens.second === 0
              ? 'Great!'
              : `${playerName}, please select the ${tokens.first + tokens.second} most preferred options`
          }
        />

        <CardList
          cards={
            roundParam === '1' || roundParam === '2' ? cards : shuffledCards
          }
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            allTokensPlaced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="w-full px-8"
        >
          <div
            className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto`}
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

export default RoundPage;
