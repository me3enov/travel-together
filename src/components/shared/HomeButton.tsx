import { useState } from 'react';
import ResetPopup from '../../components/popups/reset/ResetPopup'; // Импортируем компонент ResetPopup

const HomeButton = () => {
    const [showResetPopup, setShowResetPopup] = useState(false);

    const handleOpenResetPopup = () => {
        setShowResetPopup(true); // Открыть окно Reset
    };

    const handleCloseResetPopup = () => {
        setShowResetPopup(false); // Закрыть окно Reset
    };

    return (
        <>
            <button
                onClick={handleOpenResetPopup}
                className="w-[40px] h-[32px] cursor-pointer transition-colors duration-300 hover:bg-transparent"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="32"
                    fill="none"
                    className="transition-colors duration-300"
                >
                    <path
                        d="M34.29 18.32v11.9c0 .43-.156.802-.47 1.116a1.526 1.526 0 0 1-1.117.471h-9.527v-9.52h-6.352v9.52H7.297c-.43 0-.802-.157-1.116-.47a1.524 1.524 0 0 1-.472-1.116v-11.9L20 6.421l14.266 11.751Z"
                        className="hover:fill-white"
                        fill="currentColor"
                    />
                </svg>
            </button>

            {showResetPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <ResetPopup onClose={handleCloseResetPopup} />
                </div>
            )}
        </>
    );
};

export default HomeButton;
