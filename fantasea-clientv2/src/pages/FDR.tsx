import FDRTable from "../components/Tables/FDRTable";

export const FDR = (): JSX.Element => {

  return (
    <div className="border rounded-lg shadow-lg bg-white flex flex-col h-full">
      {/* Table */}
      <div className="px-4 py-8 bg-gray-800 border-b rounded-t-lg">
        <h2 className="text-3xl font-semibold text-gray-100">Fixture Difficulty Rating</h2>
      </div>
        <div className="flex-grow overflow-y-auto px-4">
            <FDRTable />
        </div>
    </div>
  );
};
