'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import RulesPopup from '@/components/popups/rules/RulesPopup';
import { OnStartHandler } from '@/types';

const RulesPage: FC = () => {
  const router = useRouter();

  const handleStart: OnStartHandler['onStart'] = () => {
    router.push('/round/1/1');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#C2E59C] to-[#64B3F4]">
      <RulesPopup onStart={handleStart} />
    </div>
  );
};

export default RulesPage;
