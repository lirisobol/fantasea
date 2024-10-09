import { ClubsTable } from "../components/Tables/ClubsTable";
import { Team } from "../models/gen-info/Team";
import { useAppSelector } from "../store/store";

export const Clubs = (): JSX.Element => {
  const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
  const currentGameWeekId = useAppSelector<number>((state) => state.genInfo.data?.currentGameWeekId);

  return (
    <div className="flex flex-col h-full">
      {/* Table */}
      {teams &&
        <div className="flex-grow overflow-y-auto">
          <ClubsTable teams={teams} currentGameWeekId={currentGameWeekId} />
        </div>
      }
    </div>
  );
};
