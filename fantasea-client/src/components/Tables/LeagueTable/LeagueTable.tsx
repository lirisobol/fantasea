import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/store"
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { leagueTableConfig} from "./LeagueTableConfig";
import { ColDef } from "ag-grid-community";

export const LeagueTable = ():JSX.Element => {
    const teams = useAppSelector((state) => state.generalInfo.data?.teams);
    const currentGameWeekId = useAppSelector((state) => state.generalInfo.data?.currentGameWeekId);

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

    useEffect(() => {
        const cols = leagueTableConfig.getLeagueTableColDefs(teams, currentGameWeekId);
        console.log(cols);
    
        setColumnDefs(cols)
    },[])

    return (
        <div className="ag-theme-quartz-dark" style={{ height: "100%", width: '100%', fontSize: "1rem" }}>
            <AgGridReact 
                columnDefs={columnDefs}
                rowData={teams}
                domLayout="autoHeight"
            />
        </div>
    )
    
}