import { Fixture } from "../../../models/gen-info/Fixture";
import { Team } from "../../../models/gen-info/Team";
import { PlayerHistoryItem } from "../../../models/PlayerHistoryItems";
import { Element } from "../../../models/gen-info/Element";
import { PlayerFixtureHistory } from "./PlayerFixtureHistory";

export const FixtureHistoryTable = ({
    player,
    fixtureHistory,
    teams,
    playerHistory,
  }: {
    player: Element;
    fixtureHistory: Fixture[];
    teams: Team[];
    playerHistory: PlayerHistoryItem[];
  }): JSX.Element => {
    return (
      <div className="w-full">
        {/* Header Row */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-4 border-b p-2 font-semibold text-gray-700">
          <div>Event</div>
          <div>Date</div>
          <div>Opponent</div>
          <div>Result</div>
          <div>Points</div>
        </div>
        {/* Data Rows */}
        <div className="flex flex-col w-full">
          {fixtureHistory.length > 0 ? (
            fixtureHistory.map((fixture) => (
              <PlayerFixtureHistory
                key={fixture.id}
                player={player}
                fixture={fixture}
                teams={teams}
                playerHistory={playerHistory}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No history available.</p>
          )}
        </div>
      </div>
    );
  };
  