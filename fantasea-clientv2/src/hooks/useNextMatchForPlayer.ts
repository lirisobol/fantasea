import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { agHelpers } from "../services/tables/ag-helpers";

export const useNextMatchForPlayer = (player: Element) => {
    const [nextOpponent, setNextOpponent] = useState<string>("");

    const teams = useAppSelector((state) => state.genInfo.data?.teams);
    
    const fixtures = useAppSelector((state) => state.genInfo.data?.fixtures);
    
    const currentGameWeekId = useAppSelector((state) => state.genInfo.data?.currentGameWeekId);

    useEffect(() => {
        if(player && teams && fixtures && currentGameWeekId) {
            
            const playerTeam = agHelpers.getTeamByPlayer(player, teams);
            
            if(playerTeam) {
                const teamFixtures = fixtures.filter(fixture => fixture.team_h === playerTeam.id || fixture.team_a === playerTeam.id);
                
                const upcomingGames = agHelpers.getNextGamesForClub(teamFixtures, currentGameWeekId);
                
                const nextGame = upcomingGames[0]
                const opponent = agHelpers.getOpponentName(nextGame, playerTeam, teams);
                setNextOpponent(opponent)

            }
        }
    }, [player, teams, fixtures, currentGameWeekId]);
    return nextOpponent
}