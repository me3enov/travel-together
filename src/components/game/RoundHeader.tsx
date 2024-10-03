import { motion } from 'framer-motion';

const RoundHeader = ({ roundTitle, subtitle }: { roundTitle: string, subtitle: string }) => {
    return (
        <motion.div
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: -20 }}  // Начальное состояние
            animate={{ opacity: 1, y: 0 }}    // Анимация появления
            transition={{ duration: .2, ease: 'easeOut' }}  // Плавный переход
        >
            <motion.h2
                className="text-3xl font-semibold"
                initial={{ opacity: 0, scale: 0.6 }}   // Начальная анимация заголовка
                animate={{ opacity: 1, scale: 1 }}     // Конечная анимация
                transition={{ delay: 0.4, duration: .5 }}  // Задержка перед появлением заголовка
            >
                {roundTitle} - {subtitle}
            </motion.h2>
            <motion.p
                className="text-lg text-center"
                initial={{ opacity: 0, y: 30 }}   // Анимация появления подзаголовка
                animate={{ opacity: 1, y: 0 }}    // Конечное состояние
                transition={{ delay: 0.4, duration: .5 }}  // Задержка перед появлением текста
            >
                Please select the 2 most preferred options
            </motion.p>
        </motion.div>
    );
};

export default RoundHeader;
