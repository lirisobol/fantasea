import { PlayersTable } from "../components/Tables/PlayersTable"
import { Team } from "../models/gen-info/Team";
import { useAppSelector } from "../store/store";

export const Players = ():JSX.Element => {
    const players = useAppSelector<Element[]>((state) => state.genInfo.data?.elements);
    const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
    const currentGameWeekId = useAppSelector<number>((state) => state.genInfo.data?.currentGameWeekId);
    
    return (
        <div>
            {teams && players && 
                <PlayersTable 
                    teams={teams}
                    players={players}
                    currentGameWeekId={currentGameWeekId}
                />
            }
        </div>
    )
}