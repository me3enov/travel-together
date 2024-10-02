"use client";

import Image from 'next/image';

interface HeaderProps {
  showHomeButton?: boolean;
}

const Header = ({ showHomeButton = false }: HeaderProps) => (
  <header className="w-full p-4">
    {showHomeButton && (
      <div className="flex justify-start">
        <a href="/" className="hover:opacity-80 transition">
          <Image src="/icons/home.svg" alt="Home" width={32} height={32} />
        </a>
      </div>
    )}
  </header>
);

export default Header;
