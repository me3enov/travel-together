import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

interface CardListProps {
    category: string;
    cards: { name: string; imagePath: string }[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Задержка между анимацией каждого элемента
        },
    },
};

const CardList: React.FC<CardListProps> = ({ cards }) => {
    return (
        <motion.div
            className="w-full flex flex-col items-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-wrap justify-center space-x-4">
                {cards.map((card) => (
                    <Card
                        key={card.name}
                        name={card.name}
                        imagePath={card.imagePath}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default CardList;
