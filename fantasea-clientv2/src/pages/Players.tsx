import { PlayersTableFilterGroup } from "../components/Filters/PlayersTableFilterGroup";
import { PlayersTable } from "../components/Tables/PlayersTable"
import { Team } from "../models/gen-info/Team";
import { useAppSelector } from "../store/store";

export const Players = ():JSX.Element => {
    const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
    const currentGameWeekId = useAppSelector<number>((state) => state.genInfo.data?.currentGameWeekId);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-shrink-0">
                <PlayersTableFilterGroup />
            </div>
            {teams && 
                <div className="flex-grow overflow-y-auto h-full">
                    <PlayersTable 
                        teams={teams}
                        currentGameWeekId={currentGameWeekId}
                    />
                </div>
            }
        </div>
    )
}