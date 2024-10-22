import FDRTable from "../components/Tables/FDRTable";

export const FDR = (): JSX.Element => {

  return (
    <div className="flex flex-col h-full">
      {/* Table */}
        <div className="flex-grow overflow-y-auto">
            <FDRTable />
          {/* <ClubsTable teams={teams} currentGameWeekId={currentGameWeekId} /> */}
        </div>
    </div>
  );
};
