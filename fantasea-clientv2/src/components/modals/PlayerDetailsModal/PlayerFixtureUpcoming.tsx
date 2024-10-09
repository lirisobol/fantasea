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
        <div className="border-b py-1 flex flex-col gap-1 items-center sm:flex-row sm:gap-6">
        {/* Event And Date*/}
        <div className="flex justify-center gap-5 sm:block">
            <div className="font-semibold text-xs sm:text-sm">
              {`GW${fixture.event}`}
            </div>
            <div className="text-xs">
              {generalHelpers.formatKickoffTime(fixture.kickoff_time)}
            </div>
        </div>
        {/* Opponent */}
        <div className="mt-4 sm:mt-0 flex justify-center sm:justify-start">
            <OpponentBox opponent={opponentTeam} difficulty={gameDifficulty} />
        </div>
      </div>
    )
      
}