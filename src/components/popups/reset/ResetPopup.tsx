"use client";

import Cookies from 'js-cookie';
import Button from '../../shared/Button';
import { useRouter } from 'next/navigation';
import CloseButton from '@/components/shared/CloseButton';

interface ResetPopupProps {
    onClose: () => void; // Закрыть окно при нажатии на кнопку "Нет"
}

const ResetPopup = ({ onClose }: ResetPopupProps) => {
    const router = useRouter();

    const handleReset = () => {
        // Очистка куки
        Cookies.remove('gameState');
        Cookies.remove('currentRound');
        Cookies.remove('currentSelection');
        Cookies.remove('isRescue');

        // Очистка localStorage (если это нужно)
        localStorage.clear();

        // Перенаправление на главную страницу
        router.push('/');
    };

    return (
        <div className="flex flex-col space-y-4 mt-0">
            <div
                className="relative bg-white rounded-[30px] p-[20px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full space-y-5"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Кнопка закрытия */}
                <CloseButton onClose={onClose} />
                <h2 className="text-lg font-semibold text-center text-[var(--header-text-color)] uppercase h-10">
                    Are you sure you want to reset?
                </h2>
                <div className="flex justify-around space-x-4 mt-4">
                    <Button label="Yes" onClick={handleReset} />
                    <Button label="No" onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default ResetPopup;
