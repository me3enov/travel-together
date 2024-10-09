import { ReactNode } from 'react';

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
  category: string;
  cards: { name: string; imagePath?: string }[];
}

export interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export interface TokenProps {
  value: number;
  count: number;
}

export interface RoundPreferences {
  category: string;
  options: Card[];
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

export interface OnStartHandler {
  onStart: () => void;
}

export interface ResetPopupProps {
  onClose: () => void;
}
