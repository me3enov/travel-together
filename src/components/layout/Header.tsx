"use client";

import { useSelector } from 'react-redux';
import HomeButton from '../shared/HomeButton';
import Token from '../shared/Token';
import { RootState } from '../../store';

const Header = ({ showHomeButton }: { showHomeButton: boolean }) => {
    const tokens = useSelector((state: RootState) => state.player.tokens);

    return (
        <header className="w-full flex justify-between items-center p-4 bg-transparent absolute top-0 left-0 z-50">
            {showHomeButton && <HomeButton onClick={() => console.log("Go Home")} />}
            {showHomeButton && (
                <div className="flex space-x-4">
                    <Token value={1} count={tokens.first} />
                    <Token value={2} count={tokens.second} />
                </div>
            )}
        </header>
    );
};

export default Header;
