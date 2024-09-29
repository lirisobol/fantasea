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
        <div className="flex justify-around gap-4 border p-4">
            {/* Kickoff Time */}
            <div className="w-2/4 flex flex-row gap-4">
                <span className="font-semibold ">
                    {`GW${fixture.event}`}
                </span>
                <span className="text-xs mt-1">
                    {generalHelpers.formatKickoffTime(fixture.kickoff_time)}
                </span>
            </div>
            
            <span className="w-2/4">
                <OpponentBox opponent={opponentTeam} difficulty={gameDifficulty} />
            </span>
        </div>
    )
}