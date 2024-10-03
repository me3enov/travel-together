import Card from './Card';

interface CardListProps {
    category: string;
    cards: { name: string; imagePath: string }[];
}

const CardList: React.FC<CardListProps> = ({ category, cards }) => {
    return (
        <div className="w-full flex flex-col items-center space-y-8 px-4 sm:px-8 lg:px-16">
            <div className="flex flex-wrap justify-center gap-y-8 gap-x-4 sm:gap-x-6 lg:gap-x-8">
                {cards.map((card, index) => (
                    <Card
                        key={card.name}
                        name={card.name}
                        imagePath={card.imagePath}
                        index={index}  // Передаем индекс для поочередной анимации
                    />
                ))}
            </div>
        </div>
    );
};

export default CardList;
