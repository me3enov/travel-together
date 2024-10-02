const RoundHeader = ({ roundTitle, subtitle }: { roundTitle: string, subtitle: string }) => (
    <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold">{roundTitle}</h2>
        <p className="text-lg">{subtitle}</p>
    </div>
);

export default RoundHeader;
