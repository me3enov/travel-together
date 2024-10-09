import { FC } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '@/store';
import { placeToken, removeToken } from '@/store/slices/tokenSlice';
import { CardProps } from '@/types';

const Card: FC<CardProps> = ({ name, imagePath, index }) => {
  const dispatch = useDispatch();
  const card = useSelector((state: RootState) =>
    state.token.cards.find((card) => card.name === name),
  );
  const availableTokens = useSelector(
    (state: RootState) => state.token.availableTokens,
  );

  const handleCardClick = () => {
    if (card?.token) {
      dispatch(removeToken(name));
    } else {
      dispatch(placeToken(name));
    }
  };

  const tokenIcon =
    card?.token === 1
      ? '/icons/token1.svg'
      : card?.token === 2
        ? '/icons/token2.svg'
        : null;

  const areTokensAvailable =
    availableTokens.first > 0 || availableTokens.second > 0;

  return (
    <motion.div
      className="flex flex-col items-center space-y-5 cursor-pointer"
      initial={{ opacity: 0, scale: 1.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: index * 0.1,
      }}
      whileHover={areTokensAvailable && !card?.token ? { scale: 1.1 } : {}}
      onClick={areTokensAvailable || card?.token ? handleCardClick : undefined}
    >
      <div className="relative w-[212px] h-[324px] rounded-[30px] border-[15px] border-[var(--token-background-color)]">
        <motion.div
          className="relative w-full h-full rounded-[30px] bg-[var(--card-bg-color)]"
          style={{
            filter: card?.token ? 'none' : 'grayscale(100%)',
          }}
          whileHover={
            areTokensAvailable && !card?.token
              ? { filter: 'grayscale(0%)' }
              : {}
          }
          transition={{ duration: 0.3 }}
        >
          {imagePath ? (
            <Image
              src={`${imagePath}@2x.png`}
              alt={name}
              width={212}
              height={324}
              className="w-full h-full object-cover rounded-[15px]"
            />
          ) : (
            <div className="w-full h-full bg-[var(--white-color)] rounded-[15px]" />
          )}
          {tokenIcon && (
            <Image
              src={tokenIcon}
              alt={`Token ${card?.token}`}
              width={50}
              height={50}
              className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 w-[50px] h-[50px]"
            />
          )}
        </motion.div>
      </div>
      <p className="text-center text-[var(--white-color)] text-lg">{name}</p>
    </motion.div>
  );
};

export default Card;
