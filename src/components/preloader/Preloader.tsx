"use client";

import { useEffect, useState } from 'react';
import Logo from './Logo';
import ProgressBar from './ProgressBar';
import Button from '../shared/Button';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Preloader = ({ onJoin, isStartVisible }: { onJoin: () => void, isStartVisible: boolean }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 10; // Ускоряем прогресс в 2 раза
                } else {
                    clearInterval(interval);
                    setIsLoaded(true);
                    return 100;
                }
            });
        }, 100); // Уменьшаем интервал для ускоренной загрузки

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#C2E59C] to-[#64B3F4] relative">
            <Header showHomeButton={false} />

            <div className="flex flex-col items-center space-y-8">
                <Logo />

                {!isLoaded ? (
                    <ProgressBar progress={progress} />
                ) : (
                    isStartVisible && <Button label="Start" onClick={onJoin} />
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Preloader;
