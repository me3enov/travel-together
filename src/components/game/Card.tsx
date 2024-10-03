import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { placeToken, removeToken } from '../../store/slices/tokenSlice';
import { motion } from 'framer-motion';

interface CardProps {
    name: string;
    imagePath?: string;
    index: number;
}

const Card: React.FC<CardProps> = ({ name, imagePath, index }) => {
    const dispatch = useDispatch();
    const card = useSelector((state: RootState) =>
        state.token.cards.find(card => card.name === name)
    );
    const availableTokens = useSelector((state: RootState) => state.token.availableTokens);

    const handleCardClick = () => {
        if (card?.token) {
            dispatch(removeToken(name)); // Снимаем токен при повторном клике
        } else {
            dispatch(placeToken(name));  // Ставим токен при первом клике
        }
    };

    const imageSrcSet = imagePath
        ? `${imagePath}@1x.png 1x, ${imagePath}@2x.png 2x, ${imagePath}@3x.png 3x`
        : null;

    const tokenIcon = card?.token === 1
        ? '/icons/token1.svg'
        : card?.token === 2
            ? '/icons/token2.svg'
            : null;

    // Проверяем, есть ли доступные токены
    const areTokensAvailable = availableTokens.first > 0 || availableTokens.second > 0;

    return (
        <motion.div
            className="flex flex-col items-center space-y-5 cursor-pointer"
            initial={{ opacity: 0, scale: 1.4 }} // Анимация появления
            animate={{ opacity: 1, scale: 1 }}  // Возвращение к нормальному состоянию
            transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: index * 0.1,  // Последовательное появление
            }}
            whileHover={areTokensAvailable && !card?.token ? { scale: 1.1 } : {}}  // Увеличение при наведении, если токены доступны
            onClick={areTokensAvailable || card?.token ? handleCardClick : undefined} // Клик доступен, если токены есть или токен уже на карточке
        >
            <div className="relative w-[212px] h-[324px] rounded-[30px] border-[15px] border-[var(--token-background-color)]">
                <motion.div
                    className="relative w-full h-full rounded-[30px] bg-[var(--card-bg-color)]"
                    style={{
                        filter: card?.token ? 'none' : 'grayscale(100%)',
                    }}
                    whileHover={areTokensAvailable && !card?.token ? { filter: 'grayscale(0%)' } : {}}  // Снятие фильтра при наведении, если токены доступны
                    transition={{ duration: 0.3 }}
                >
                    {imagePath ? (
                        <img
                            src={`${imagePath}@1x.png`}
                            srcSet={imageSrcSet}
                            alt={name}
                            className="w-full h-full object-cover rounded-[15px]"
                        />
                    ) : (
                        <div className="w-full h-full bg-[var(--white-color)] rounded-[15px]" />
                    )}
                    {tokenIcon && (
                        <img
                            src={tokenIcon}
                            alt={`Token ${card?.token}`}
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
