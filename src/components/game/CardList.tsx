import React, { FC } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { CardListProps } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const CardList: FC<CardListProps> = ({ cards }) => {
  return (
    <motion.div
      className="w-full flex flex-col items-center space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-wrap justify-center gap-10">
        {cards.map((card, index) => (
          <Card
            key={card.name}
            name={card.name}
            imagePath={card.imagePath}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CardList;
