import { FC } from 'react';
import { ButtonProps } from '@/types';

const Button: FC<ButtonProps> = ({ label, onClick, disabled = false }) => (
  <button
    className={`w-full h-10 rounded-full uppercase transition-all duration-300 ease-in-out 
                    ${
                      disabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[var(--primary-color)] text-white hover:bg-gradient-to-r hover:from-[var(--primary-color)] hover:to-[var(--hover-primary-color)] hover:bg-size-200 hover:bg-pos-0 hover:bg-right-200'
                    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
