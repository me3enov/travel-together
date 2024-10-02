const Button = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
        className="bg-[var(--primary-color)] text-white w-full h-10 rounded-full uppercase transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[var(--primary-color)] hover:to-[var(--hover-primary-color)] hover:bg-size-200 hover:bg-pos-0 hover:bg-right-200"
        onClick={onClick}
    >
        {label}
    </button>
);

export default Button;
