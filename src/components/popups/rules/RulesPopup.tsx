'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Button from '@/components/shared/Button';
import RulesContent from './RulesContent';
import { OnStartHandler } from '@/types';

const RulesPopup: FC<OnStartHandler> = ({ onStart }) => {
  const router = useRouter();

  const handleStart = () => {
    Cookies.set('gameState', 'in_progress');
    Cookies.set('currentRound', '1');
    Cookies.set('currentSelection', '1');
    Cookies.set('isRescue', 'false');
    window.history.replaceState(null, '', `/round/1/1`);

    onStart();
    router.push('/round/1/1');
  };

  return (
    <div className="flex flex-col space-y-5 w-full">
      <h2 className="text-lg font-semibold text-center text-[#424242] uppercase">
        Rules of Travel Together
      </h2>
      <div className="text-sm overflow-y-auto max-h-96 p-4 bg-gray-100 rounded-[15px] text-[#5A5A5A] w-full">
        <RulesContent />
      </div>
      <Button label="Start" onClick={handleStart} />
    </div>
  );
};

export default RulesPopup;
