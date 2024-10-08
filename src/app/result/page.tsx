"use client";

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import {loadFromLocalStorage} from "@/utils/localStorage";

const ResultPage = () => {
    const permanentCards = useSelector((state: RootState) => loadFromLocalStorage('permanentCards') || []);

    // Фильтруем карточки с main = true и tokenPlaced = true
    const mainPreferences = permanentCards
        .filter((card: any) => card.main && card.tokenPlaced)
        .sort((a: any, b: any) => b.score - a.score); // Сортировка по баллам

    // Фильтруем карточки с main = false и tokenPlaced = true
    const leisurePreferences = permanentCards
        .filter((card: any) => !card.main && card.tokenPlaced)
        .sort((a: any, b: any) => b.score - a.score); // Сортировка по баллам

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header showHomeButton={false} />

            <div className="flex-grow flex flex-col items-center justify-center py-16 px-4">
                {/* Основные предпочтения */}
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Main Preferences</h1>
                <div className="overflow-x-auto w-full max-w-4xl">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="text-left px-6 py-3 font-semibold text-sm uppercase">Name</th>
                            <th className="text-left px-6 py-3 font-semibold text-sm uppercase">Score</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {mainPreferences.map((card: any) => (
                            <tr key={card.name} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{card.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{card.score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Досуг */}
                <h1 className="text-4xl font-bold mt-16 mb-8 text-gray-800">Leisure</h1>
                <div className="overflow-x-auto w-full max-w-4xl">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="text-left px-6 py-3 font-semibold text-sm uppercase">Name</th>
                            <th className="text-left px-6 py-3 font-semibold text-sm uppercase">Score</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {leisurePreferences.map((card: any) => (
                            <tr key={card.name} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{card.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{card.score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ResultPage;
