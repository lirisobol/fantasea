import { useEffect, useState } from "react";
import { Element } from "../../../models/gen-info/Element"
import { Fixture } from "../../../models/gen-info/Fixture";
import { Team } from "../../../models/gen-info/Team";
import { agHelpers } from "../../../services/tables/ag-helpers";

interface PlayerFixtureUpcomingProps {
    player:Element;
    fixture: Fixture;
    teams: Team[];
}

export const PlayerFixtureUpcoming = ({player, fixture, teams}:PlayerFixtureUpcomingProps):JSX.Element => {

    const [opponentTeam, setOpponentTeam] = useState<string>('');
    const playerTeam:Team = teams.find(t => t.code === player.team_code);

    useEffect(() => {
        if(!player.isPlaceholder) {
            const opponent = agHelpers.getOpponentName(fixture, playerTeam, teams);
            setOpponentTeam(opponent);
        }
    }, [player, fixture, playerTeam, teams])
    


    return (
        <div className="
            flex
            justify-around 
            gap-4 border p-4"
            >
            <span>
                {fixture.kickoff_time}
            </span>
            <span>
                {opponentTeam}
            </span>
            <span className="flex flex-row gap-2">
                <span>{fixture.team_h_score}</span>
                <span> - </span>
                <span>{fixture.team_a_score}</span>
            </span>
        </div>
    )
}