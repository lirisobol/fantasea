import { useEffect, useState } from "react";
import { Element } from "../../../models/gen-info/Element"
import { Fixture } from "../../../models/gen-info/Fixture";
import { Team } from "../../../models/gen-info/Team";
import { generalHelpers } from "../../../services/general-helpers/general-helpers";
import { OpponentBox } from "./OpponentBox";

interface PlayerFixtureUpcomingProps {
    player:Element;
    fixture: Fixture;
    teams: Team[];
}

export const PlayerFixtureUpcoming = ({player, fixture, teams}:PlayerFixtureUpcomingProps):JSX.Element => {
    // const playerTeam:Team = teams.find(t => t.code === player.team_code);
    const [playerTeam, setPlayerTeam] = useState("");
    const [opponentTeam, setOpponentTeam] = useState<string>('');
    const [gameDifficulty, setGameDifficulty] = useState<number>(0);

    useEffect(() => {
        if(!player.isPlaceholder) {
            const team = teams.find(t => t.code === player.team_code);
            setPlayerTeam(team);
            const opponentId = generalHelpers.getOpponentTeamId(fixture, playerTeam);
            const opponent = generalHelpers.getOpponentName(fixture, opponentId, teams);
            setOpponentTeam(opponent);
            const difficulty = generalHelpers.getDifficultyRating(fixture, playerTeam.id);
            setGameDifficulty(difficulty);
        }
    }, [player, fixture, playerTeam, teams])
    


    return (
        <div className="flex items-center gap-4 border p-2">
          {/* Kickoff Time */}
            <div className="w-40 flex-shrink-0 flex items-center gap-2">
                <span className="font-semibold w-12 flex-shrink-0">
                  {`GW${fixture.event}`}
                </span>
                <span className="text-xs ml-2 flex-grow">
                  {generalHelpers.formatKickoffTime(fixture.kickoff_time)}
                </span>
            </div>
            {/* Opponent */}
            <div className="flex-grow">
                <OpponentBox opponent={opponentTeam} difficulty={gameDifficulty} />
            </div>
        </div>
    )
      
}