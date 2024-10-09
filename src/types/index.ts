export interface Card {
  name: string;
  imagePath: string;
  category: string;
  tokenPlaced?: boolean;
  token?: number | null;
  score?: number;
  main?: boolean;
}

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

export interface CardProps {
  name: string;
  imagePath?: string;
  index: number;
}

export interface CardListProps {
  cards: { name: string; imagePath?: string }[];
}

export interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface GoogleSheetsData {
  playerName: string;
  preferences: string[];
  timestamp: string;
}

export interface RoundHeaderProps {
  roundTitle: string;
  subtitle: string;
}

export interface Option {
  name: string;
  imagePath: string;
}

export interface ShuffledRound {
  options: Card[];
}

export interface OnStartHandler {
  onStart: () => void;
}

export interface ResetPopupProps {
  onClose: () => void;
}
