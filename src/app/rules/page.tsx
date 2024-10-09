"use client";

import { useRouter } from 'next/navigation';  // Импортируем роутер для клиента
import RulesPopup from '../../components/popups/rules/RulesPopup';

const RulesPage = () => {
    const router = useRouter();  // Здесь безопасно использовать роутер

    const handleStart = () => {
        // Перенаправляем на первый мини-раунд (Round 1, Selection 1)
        router.push('/round/1/1');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#C2E59C] to-[#64B3F4]">
            <RulesPopup onStart={handleStart} />
        </div>
    );
};

export default RulesPage;
