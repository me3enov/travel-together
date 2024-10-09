'use client';

import { FC, ReactNode, useEffect } from 'react';
import CloseButton from './CloseButton';
import { ModalProps } from '@/types';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, children, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-[60px]"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[30px] p-[20px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClose={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
