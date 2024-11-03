import { CleanSheets } from "../components/Tables/CleanSheets";
import { MostAssists } from "../components/Tables/MostAssists";
import { MostGoals } from "../components/Tables/MostGoals";
import { MostTransferredIn } from "../components/Tables/MostTransferredIn";
import { MostTransferredOut } from "../components/Tables/MostTransferredOut";
import { TableCard } from "../components/Tables/TableCard";
import { FDR } from "./FDR";
import { Players } from "./Players";

export const Home = (): JSX.Element => {
    return (
        <div className="flex flex-wrap h-screen justify-center gap-4">
            <div className="w-full h-5/6 md:px-12">
                <Players />
            </div>
            <div className="w-full h-5/6 md:px-12">
                <FDR />
            </div>
            <div className="w-full md:px-12 gap-4 grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="h-[42rem] py-4">
                    <TableCard tableComponent={<MostTransferredIn />} />
                </div>
                <div className="h-[42rem] py-4">
                    <TableCard tableComponent={<MostTransferredOut />} />
                </div>
                <div className="h-[42rem] py-4">
                    <TableCard tableComponent={<MostGoals />} />
                </div>
                <div className="h-[42rem] py-4">
                    <TableCard tableComponent={<MostAssists />} />
                </div>
                <div className="h-[42rem] py-4">
                    <TableCard tableComponent={<CleanSheets />}/>
                </div>  
            </div>
        </div>
  );
};
