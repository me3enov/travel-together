import Card from './Card';

interface CardListProps {
    category: string;
    cards: { name: string; imagePath: string }[];
}

const CardList: React.FC<CardListProps> = ({ category, cards }) => {
    return (
        <div className="w-full flex flex-col items-center space-y-8">
            <div className="flex flex-wrap justify-center space-x-4">
                {cards.map((card) => (
                    <Card
                        key={card.name}
                        name={card.name}
                        imagePath={card.imagePath}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardList;
