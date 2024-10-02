interface ProgressBarProps {
    progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => (
    <div className="w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-full h-2.5 mb-2">
            <div
                className="bg-[var(--primary-color)] h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
            />
        </div>
        <span className="text-white text-sm">{progress}%</span> {/* Текстовый прогресс */}
    </div>
);

export default ProgressBar;
