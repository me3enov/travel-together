const RulesContent = () => (
    <div className="text-sm text-left text-[#5A5A5A] w-full space-y-4">
        <p>
            <strong>Goal of the Game</strong>
        </p>
        <p>
            This game will help you determine which vacation and leisure options are most preferred by each participant. Over three rounds, you will evaluate different options using tokens to ultimately select the most desirable ones.
        </p>

        <h3 className="font-semibold">How to Play</h3>

        <h4 className="font-semibold">First Round: Evaluating Options</h4>
        <p><strong>Assigning Tokens:</strong> For each option, you must choose one of two tokens:</p>
        <ul className="list-disc pl-5">
            <li><strong>Token 1</strong> — your top choice (worth 3 points).</li>
            <li><strong>Token 2</strong> — you like it, but it's not the top choice (worth 2 points).</li>
            <li>All other options automatically receive 0 points.</li>
        </ul>

        <p><strong>Rescue Tokens:</strong> At the end of the round, you can use 3 additional tokens: 1, 2, and 2, to "rescue" three options that received 0 points, replacing their scores with 3 or 2 points.</p>

        <h4 className="font-semibold">Second Round: Cross-Category Comparison</h4>
        <p><strong>Evaluating Options Again:</strong> The options that advanced from the first round are now re-evaluated using the same token system:</p>
        <ul className="list-disc pl-5">
            <li><strong>Token 1</strong> — 3 points.</li>
            <li><strong>Token 2</strong> — 2 points.</li>
        </ul>
        <p><strong>Rescue Tokens:</strong> You again have 3 rescue tokens: 1, 2, and 2, to promote 3 options that received 0 points.</p>

        <h4 className="font-semibold">Third Round: Final Selection</h4>
        <p><strong>Final Evaluation:</strong> The remaining options are evaluated one last time with tokens 1 and 2.</p>
        <p><strong>Last Chance Rescue:</strong> You have one last rescue token with a value of 1, which you can use to promote one option that received 0 points.</p>

        <h4 className="font-semibold">Scoring</h4>
        <ul className="list-disc pl-5">
            <li><strong>Token 1</strong> — 3 points.</li>
            <li><strong>Token 2</strong> — 2 points.</li>
            <li>All others — 0 points.</li>
        </ul>

        <h4 className="font-semibold">Final Result</h4>
        <p>
            At the end of the game, the points for each option are tallied. The options with the highest scores are the ones that you and the other participants prefer the most.
        </p>

        <p className="font-semibold">Enjoy the game and have a wonderful vacation!</p>
    </div>
);

export default RulesContent;
