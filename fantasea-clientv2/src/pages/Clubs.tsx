import { ClubsTable } from "../components/Tables/ClubsTable"
import { Team } from "../models/gen-info/Team";
import { useAppSelector } from "../store/store";

export const Clubs = ():JSX.Element => {
    const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
    const currentGameWeekId = useAppSelector<number>((state) => state.genInfo.data?.currentGameWeekId);
    
    return (
        <div>
            {teams &&
                <ClubsTable teams={teams} currentGameWeekId={currentGameWeekId} />
            }
        </div>
    )
}