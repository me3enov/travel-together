"use client";  // Убедимся, что это клиентский компонент

import { useRouter } from 'next/navigation';  // Импортируем правильную версию useRouter
import Button from '../shared/Button';
import RulesContent from './RulesContent';

const RulesPopup = () => {
    const router = useRouter();

    const handleStart = () => {
        // Переход на первый минираунд (Round 1, Selection 1)
        router.push('/round/1/1');
    };

    return (
        <div className="flex flex-col space-y-5 w-full">
            <h2 className="text-lg font-semibold text-center text-[#424242] uppercase">Rules of Travel Together</h2>
            <div className="text-sm overflow-y-auto max-h-96 p-4 bg-gray-100 rounded-[15px] text-[#5A5A5A] w-full">
                <RulesContent />
            </div>
            <Button label="Start" onClick={handleStart} />
        </div>
    );
};

export default RulesPopup;
