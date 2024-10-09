import { FC } from 'react';
import { motion } from 'framer-motion';
import { RoundHeaderProps } from '@/types';

const RoundHeader: FC<RoundHeaderProps> = ({ roundTitle, subtitle }) => {
  return (
    <motion.div
      className="flex flex-col items-center space-y-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <motion.h2
        className="text-3xl font-semibold"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {roundTitle}
      </motion.h2>
      <motion.p
        className="text-lg text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default RoundHeader;
