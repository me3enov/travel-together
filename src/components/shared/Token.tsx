import { FC } from 'react';
import Image from 'next/image';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const basePath = publicRuntimeConfig.basePath || '';

export interface TokenProps {
  value: number;
  count: number;
}

const Token: FC<TokenProps> = ({ value, count }) => {
  const iconSrc =
    value === 1
      ? `${basePath}/icons/token1.svg`
      : `${basePath}/icons/token2.svg`;

  return (
    <div className="flex items-center space-x-2">
      <Image src={iconSrc} alt={`Token ${value}`} width={32} height={32} />
      <span className="text-white text-lg font-bold">X {count}</span>
    </div>
  );
};

export default Token;
