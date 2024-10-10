import { FC } from 'react';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const Logo: FC = () => (
  <Image
    src={`${basePath}/images/logo/logo.png`}
    alt="Travel Together Logo"
    width={320}
    height={200}
    sizes="(max-width: 640px) 10rem, (max-width: 1024px) 13rem, (max-width: 1280px) 16rem, (max-width: 1536px) 18rem, 20rem"
    className="w-40 sm:w-52 md:w-64 lg:w-72 xl:w-80 h-auto"
  />
);

export default Logo;
