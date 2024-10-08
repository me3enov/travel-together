export interface CardState {
    name: string;
    imagePath: string;
    category: string;
    token: 1 | 2 | null;
}

export interface TokenState {
    availableTokens: {
        first: number;
        second: number;
    };
    cards: CardState[];
}
