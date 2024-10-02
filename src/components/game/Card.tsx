import React from 'react';

interface CardProps {
    name?: string;
    imagePath?: string;
}

const Card: React.FC<CardProps> = ({ name = "Name", imagePath }) => {
    const imageSrcSet = imagePath
        ? `${imagePath}@1x.png 1x, ${imagePath}@2x.png 2x, ${imagePath}@3x.png 3x`
        : null;

    return (
        <div className="flex flex-col items-center space-y-5">
            <div className="relative w-[212px] h-[324px] rounded-[30px] border-[15px] border-[var(--token-background-color)] cursor-pointer">
                <div className="relative w-full h-full rounded-[30px] bg-[var(--card-bg-color)]">
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
                    <div className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 w-[50px] h-[50px] rounded-full bg-[var(--token-background-color)]" />
                </div>
            </div>
            <p className="text-center text-[var(--white-color)] text-lg">{name}</p>
        </div>
    );
};

export default Card;
