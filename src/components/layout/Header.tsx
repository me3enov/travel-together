"use client";

import { useSelector } from 'react-redux';
import HomeButton from '../shared/HomeButton';
import Token from '../shared/Token';
import { RootState } from '../../store';

const Header = ({ showHomeButton }: { showHomeButton: boolean }) => {
    const tokens = useSelector((state: RootState) => state.token.availableTokens);
    // Функция для полной очистки LocalStorage
    const handleClearStorage = () => {
        if (typeof window !== 'undefined') {
            localStorage.clear();
            console.log('LocalStorage has been cleared.');
        }
    };

    return (
        <header className="w-full h-16 flex justify-between items-center p-4 bg-transparent fixed top-0 left-0 z-50"> {/* Высота 16 = 4rem */}
            {showHomeButton && <HomeButton onClick={() => handleClearStorage()} />}
            {showHomeButton && (
                <div className="flex space-x-8">
                    <Token value={1} count={tokens.first} />
                    <Token value={2} count={tokens.second} />
                </div>
            )}
        </header>
    );
};

export default Header;
