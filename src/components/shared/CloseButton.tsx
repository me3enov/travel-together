interface CloseButtonProps {
    onClose: () => void;
}

const CloseButton = ({ onClose }: CloseButtonProps) => (
    <button
        className="absolute top-[-10px] right-[-10px] w-[15px] h-[15px] cursor-pointer transition-colors duration-300 hover:bg-transparent"
        onClick={onClose}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="none"
            className="transition-colors duration-300"
        >
            <path
                d="M15 1.364 13.636 0 7.5 6.136 1.364 0 0 1.364 6.136 7.5 0 13.636 1.364 15 7.5 8.864 13.636 15 15 13.636 8.864 7.5 15 1.364Z"
                className="hover:fill-white"
                fill="currentColor"
            />
        </svg>
    </button>
);

export default CloseButton;
