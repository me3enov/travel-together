'use client';

import { useState, useEffect, FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { saveToGoogleSheets } from '@/utils/googleSheets';
import { Card, GoogleSheetsData } from '@/types';

const ResultPage: FC = () => {
  const router = useRouter();
  const [permanentCards, setPermanentCards] = useState<Card[]>([]);
  const [playerName, setPlayerName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedCards: Card[] = JSON.parse(
      localStorage.getItem('permanentCards') || '[]',
    );
    const name = Cookies.get('playerName');
    setPermanentCards(storedCards);
    setPlayerName(name);

    if (name && storedCards.length > 0) {
      const preferences = storedCards
        .filter((card) => card.tokenPlaced)
        .map((card) => card.name);

      const googleSheetsData: GoogleSheetsData = {
        playerName: name,
        preferences,
        timestamp: new Date().toISOString(),
      };

      saveToGoogleSheets(googleSheetsData);
    }
  }, []);

  const mainPreferences = permanentCards
      .filter((card) => card.main && card.tokenPlaced)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const leisurePreferences = permanentCards
      .filter((card) => !card.main && card.tokenPlaced)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const handleReset = () => {
    Cookies.remove('gameState');
    Cookies.remove('currentRound');
    Cookies.remove('currentSelection');
    Cookies.remove('isRescue');
    Cookies.remove('playerName');
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header showHomeButton={false} />
      <div className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <Image
          src="https://i.giphy.com/XcH2j14aWyAknYAE1U.webp"
          alt="Giphy Image"
          width={50}
          height={50}
          className="w-full h-auto"
        />
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          {`${playerName}, congratulations on completing the Travel Together game!`}
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          You have explored your preferences and discovered what kind of trip
          would suit you best. Check out your top choices below.
        </p>

        <h2 className="text-3xl font-semibold mb-8 text-gray-800">
          Main Preferences
        </h2>
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-sm uppercase">
                  Name
                </th>
                <th className="text-left px-6 py-3 font-semibold text-sm uppercase">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mainPreferences.map((card, index) => (
                <tr key={`${card.name}-${index}`} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {card.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {card.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-semibold mt-16 mb-8 text-gray-800">
          Leisure Preferences
        </h2>
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-sm uppercase">
                  Name
                </th>
                <th className="text-left px-6 py-3 font-semibold text-sm uppercase">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leisurePreferences.map((card, index) => (
                <tr key={`${card.name}-${index}`} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {card.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {card.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12">
          <button
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Start Over
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultPage;
