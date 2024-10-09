'use client';

import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openResetPopup } from '@/store/slices/popupSlice';
import HomeButton from '@/components/shared/HomeButton';
import Token from '@/components/shared/Token';
import { RootState } from '@/store';

interface HeaderProps {
  showHomeButton: boolean;
}

const Header: FC<HeaderProps> = ({ showHomeButton }) => {
  const tokens = useSelector((state: RootState) => state.token.availableTokens);
  const dispatch = useDispatch();

  const handleOpenResetPopup = () => {
    dispatch(openResetPopup());
  };

  return (
    <header className="w-full h-16 flex justify-between items-center p-4 bg-transparent fixed top-0 left-0 z-50">
      {showHomeButton && <HomeButton onClick={handleOpenResetPopup} />}
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
