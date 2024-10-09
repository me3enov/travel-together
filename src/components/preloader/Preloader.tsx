'use client';

import { FC } from 'react';
import Logo from './Logo';
import Button from '@/components/shared/Button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface PreloaderProps {
  onJoin: () => void;
}

const Preloader: FC<PreloaderProps> = ({ onJoin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] relative">
      <Header showHomeButton={false} />
      <div className="flex flex-col items-center space-y-8">
        <Logo />
        <Button label="Start" onClick={onJoin} />
      </div>
      <Footer />
    </div>
  );
};

export default Preloader;
