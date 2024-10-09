'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CardList from '@/components/game/CardList';
import RoundHeader from '@/components/game/RoundHeader';
import Button from '@/components/shared/Button';
import { RootState } from '@/store';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  moveTempToPermanentStorage,
  saveShuffledCardsToStorage,
  loadShuffledRoundsFromStorage,
} from '@/utils/localStorage';
import {
  initializeCards,
  placeToken,
  removeToken,
  setTokensByRoundType,
} from '@/store/slices/tokenSlice';
import cardsData from '../../../../../public/data/cards.json';
import { Card, TokenProps, RoundPreferences } from '@/types';

const RoundPage: FC = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const { round, selection } = params;
  const tokens: TokenProps = useSelector(
    (state: RootState) => state.token.availableTokens,
  );
  const cards: Card[] = useSelector((state: RootState) => state.token.cards);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);

  const currentPreferences: RoundPreferences =
    round === '1' ? cardsData.preferences : cardsData.leisureCategories;

  useEffect(() => {
    const nameFromCookie = Cookies.get('playerName');
    if (nameFromCookie) {
      setPlayerName(nameFromCookie);
    }

    if (round === '1' || round === '2') {
      const selectedCategory = currentPreferences[parseInt(selection) - 1];
      const cardData = selectedCategory?.options.map((option) => ({
        name: option.name,
        imagePath: option.imagePath,
        category: selectedCategory.category,
        token: null,
      }));
      dispatch(initializeCards(cardData || []));
    } else {
      let shuffledRounds = loadShuffledRoundsFromStorage();
      if (selection === '1') {
        saveToLocalStorage('shuffledRounds', []);
        shuffledRounds = [];
      }

      if (!shuffledRounds || shuffledRounds.length === 0) {
        const tempCards =
          loadFromLocalStorage('tempCards')?.filter(
            (card: Card) => card.token !== null,
          ) || [];
        const shuffled = [...tempCards].sort(() => 0.5 - Math.random());

        saveShuffledCardsToStorage(shuffled);
        shuffledRounds = loadShuffledRoundsFromStorage();
      }

      const currentRound = shuffledRounds[parseInt(selection) - 1];
      dispatch(
        initializeCards(
          currentRound.options.map((card: Card) => ({
            name: card.name,
            imagePath: card.imagePath,
            category: 'Mixed',
            token: null,
          })),
        ),
      );
      setShuffledCards(currentRound.options);
    }

    dispatch(setTokensByRoundType({ round: parseInt(round), isRescue: false }));
  }, [dispatch, selection, currentPreferences, round]);

  const allTokensPlaced = tokens.first === 0 && tokens.second === 0;

  const handleTokenPlace = (name: string) => {
    const card = cards.find((card) => card.name === name);
    if (card?.token !== null) {
      dispatch(removeToken(name));
    } else {
      dispatch(placeToken(name));
    }
  };

  const handleNextClick = () => {
    const nextSelection = parseInt(selection) + 1;
    const shuffledRounds = loadShuffledRoundsFromStorage();

    if (selection === '1') {
      moveTempToPermanentStorage();
      saveToLocalStorage('tempCards', []);
    }

    cards.forEach((card) => {
      const fullCardData =
        round === '1' || round === '2'
          ? currentPreferences[parseInt(selection) - 1]?.options?.find(
              (option) => option.name === card.name,
            )
          : shuffledCards.find(
              (shuffledCard) => shuffledCard.name === card.name,
            );

      const newCard = {
        name: card.name,
        imagePath: fullCardData?.imagePath || '',
        main: round === '1',
        category: currentPreferences[parseInt(selection) - 1]?.category,
        tokenPlaced: card.token !== null,
        score: card.token === 1 ? 3 : card.token === 2 ? 2 : 0,
      };

      const existingTempCards = loadFromLocalStorage('tempCards') || [];
      saveToLocalStorage('tempCards', [...existingTempCards, newCard]);
    });

    if (round === '1') {
      if (nextSelection <= currentPreferences.length) {
        Cookies.set('currentRound', round);
        Cookies.set('currentSelection', nextSelection.toString());
        Cookies.set('isRescue', 'false');
        window.history.replaceState(
          null,
          '',
          `/round/${round}/${nextSelection}`,
        );
        router.push(`/round/${round}/${nextSelection}`);
      } else {
        Cookies.set('currentRound', '2');
        Cookies.set('currentSelection', '1');
        Cookies.set('isRescue', 'false');
        window.history.replaceState(null, '', `/round/2/1`);
        router.push(`/round/2/1`);
      }
    } else if (round === '2') {
      if (nextSelection <= currentPreferences.length) {
        Cookies.set('currentRound', round);
        Cookies.set('currentSelection', nextSelection.toString());
        Cookies.set('isRescue', 'false');
        window.history.replaceState(
          null,
          '',
          `/round/${round}/${nextSelection}`,
        );
        router.push(`/round/${round}/${nextSelection}`);
      } else {
        Cookies.set('currentRound', round);
        Cookies.set('currentSelection', 'rescue');
        Cookies.set('isRescue', 'true');
        window.history.replaceState(null, '', `/round/${round}/rescue`);
        router.push(`/round/${round}/rescue`);
      }
    } else {
      if (nextSelection <= shuffledRounds.length) {
        Cookies.set('currentRound', round);
        Cookies.set('currentSelection', nextSelection.toString());
        Cookies.set('isRescue', 'false');
        window.history.replaceState(
          null,
          '',
          `/round/${round}/${nextSelection}`,
        );
        router.push(`/round/${round}/${nextSelection}`);
      } else {
        Cookies.set('currentRound', round);
        Cookies.set('currentSelection', 'rescue');
        Cookies.set('isRescue', 'true');
        window.history.replaceState(null, '', `/round/${round}/rescue`);
        router.push(`/round/${round}/rescue`);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        showHomeButton={true}
        remainingChips={tokens}
        onReset={() => {}}
      />
      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] space-y-8 pt-16 pb-16">
        <RoundHeader
          roundTitle={`Round ${round}.${selection}`}
          subtitle={
            tokens.first + tokens.second === 0
              ? 'Great!'
              : `${playerName}, please select the ${tokens.first + tokens.second} most preferred options`
          }
        />
        <CardList
          category={
            currentPreferences[parseInt(selection) - 1]?.category ||
            'Random Cards'
          }
          cards={round === '1' || round === '2' ? cards : shuffledCards}
          onTokenPlace={handleTokenPlace}
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
