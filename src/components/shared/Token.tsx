import React from 'react';

interface TokenProps {
    value: 1 | 2;
    count: number;
}

const Token: React.FC<TokenProps> = ({ value, count }) => {
    const iconSrc = value === 1 ? '/icons/token1.svg' : '/icons/token2.svg';

    return (
        <div className="flex items-center space-x-2">
            <img src={iconSrc} alt={`Token ${value}`} className="w-8 h-8" />
            <span className="text-white text-lg font-bold">X {count}</span>
        </div>
    );
};

export default Token;
