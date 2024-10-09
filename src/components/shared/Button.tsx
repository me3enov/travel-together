interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;  // Добавляем проп для disabled
}

const Button = ({ label, onClick, disabled = false }: ButtonProps) => (
    <button
        className={`w-full h-10 rounded-full uppercase transition-all duration-300 ease-in-out 
                    ${disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'  // Стили для disabled состояния
            : 'bg-[var(--primary-color)] text-white hover:bg-gradient-to-r hover:from-[var(--primary-color)] hover:to-[var(--hover-primary-color)] hover:bg-size-200 hover:bg-pos-0 hover:bg-right-200'
        }`}
        onClick={onClick}
        disabled={disabled}  // Атрибут disabled
    >
        {label}
    </button>
);

export default Button;
