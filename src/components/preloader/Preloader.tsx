"use client";

import Logo from './Logo';
import Button from '../shared/Button';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Preloader = ({ onJoin }: { onJoin: () => void }) => {

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
