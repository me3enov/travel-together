'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Button from '@/components/shared/Button';
import CloseButton from '@/components/shared/CloseButton';
import { ResetPopupProps } from '@/types';

const ResetPopup: FC<ResetPopupProps> = ({ onClose }) => {
  const router = useRouter();

  const handleReset = () => {
    Cookies.remove('gameState');
    Cookies.remove('currentRound');
    Cookies.remove('currentSelection');
    Cookies.remove('isRescue');
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className="flex flex-col space-y-4 mt-0">
      <div
        className="relative bg-white rounded-[30px] p-[20px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
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
