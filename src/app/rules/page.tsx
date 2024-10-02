"use client";

import { useRouter } from 'next/router';
import RulesPopup from '../../components/rules/RulesPopup';

const RulesPage = () => {
    const router = useRouter();

    const handleStart = () => {
        router.push('/round');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#C2E59C] to-[#64B3F4]">
            <RulesPopup onStart={handleStart} />
        </div>
    );
};

export default RulesPage;
