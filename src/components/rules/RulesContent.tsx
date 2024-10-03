const RulesContent = () => (
    <div className="text-sm text-left text-[#5A5A5A] w-full space-y-4">
        <p>
            <strong>Goal of the Game</strong>
        </p>
        <p>
            This game will help you determine which vacation and leisure options are most preferred by each participant.
            Over four rounds, you will evaluate various options using tokens to ultimately select the most desired ones.
        </p>

        <h3 className="font-semibold">How to Play</h3>

        <h4 className="font-semibold">First Round: Primary Preferences</h4>
        <p>Each category (e.g., "Location") is a mini-round. In each mini-round, you choose from the options provided using two tokens:</p>
        <ul className="list-disc pl-5">
            <li><strong>Token 1</strong> — your top choice (worth 3 points).</li>
            <li><strong>Token 2</strong> — a preferred but not top choice (worth 2 points).</li>
            <li>All other options automatically receive 0 points.</li>
        </ul>

        <h4 className="font-semibold">Second Round: Leisure Categories</h4>
        <p>Just like the first round, each category is a mini-round where participants evaluate options using Token 1 and Token 2.</p>

        <h4 className="font-semibold">Rescue Stage</h4>
        <p>After the second round, a rescue stage begins. You have 4 tokens (two Token 1s and two Token 2s) to "rescue" up to four options that did not receive any tokens in the previous rounds.</p>

        <h4 className="font-semibold">Third Round: Mixed Options</h4>
        <p>The remaining cards are shuffled, and in each mini-round, 4 options are presented. You use two tokens (1 and 2) to select your preferences.
            At the end of this round, there is another rescue stage with two tokens (1 and 2).</p>

        <h4 className="font-semibold">Fourth Round: The Final Round</h4>
        <p>This round works the same as the third, but after it ends, you are given only one rescue token, a Token 1, for the final rescue stage.</p>

        <h4 className="font-semibold">Scoring</h4>
        <ul className="list-disc pl-5">
            <li><strong>Token 1</strong> — 3 points.</li>
            <li><strong>Token 2</strong> — 2 points.</li>
            <li>All others — 0 points.</li>
        </ul>

        <h4 className="font-semibold">Final Result</h4>
        <p>
            At the end of the game, the points for each option are tallied. The options with the highest scores are those that you and the other participants prefer the most.
        </p>

        <p className="font-semibold">Enjoy the game and have fun choosing your perfect vacation!</p>
    </div>
);

export default RulesContent;
