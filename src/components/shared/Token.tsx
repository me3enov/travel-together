const Token = ({ value, count }: { value: 1 | 2 | 0; count: number }) => {
    let textColor = value === 1 ? 'text-[#77D6B1]' : value === 2 ? 'text-[#B6E2D1]' : 'text-gray-400';

    return (
        <div className="flex items-center justify-center bg-white rounded-full w-10 h-10 text-xl relative">
            <span className={`font-bold ${textColor}`}>{value}</span>
            {count > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2 py-0.5 shadow-md font-semibold">
                    {count}
                </span>
            )}
        </div>
    );
};

export default Token;
