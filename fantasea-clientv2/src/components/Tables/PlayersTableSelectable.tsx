// interface PlayersTableSelectableProps {
//     teams: Team[];
//     currentGameWeekId: number

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { ColDef } from "ag-grid-community";
import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { Element } from "../../models/gen-info/Element";
import { playersTableHelpers } from "../../services/tables/table-specific/players-table-helpers";
import { fetchGeneralInfo } from "../../store/slices/gen-info";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';

// }
export const PlayersTableSelectable = ():JSX.Element => {
    
    const dispatch = useAppDispatch();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

    const teams = useAppSelector((state) => state.genInfo.data?.teams);
    const currentGameWeekId = useAppSelector((state) => state.genInfo.data?.currentGameWeekId);
    
    const teamCode = useAppSelector((state) => state.filters.teamCode);
    const positionType = useAppSelector((state) => state.filters.positionType);
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);
    const minPrice = useAppSelector((state) => state.filters.minPrice);
    const maxPrice = useAppSelector((state) => state.filters.maxPrice);

    
    const players:Element[] = useFilteredPlayers(teamCode, positionType, searchQuery, minPrice, maxPrice);
    useEffect(() => {
        if(teams && players  && currentGameWeekId) {
            const cols = playersTableHelpers.setColDef(teams, players, currentGameWeekId, 5);
            setColumnDefs(cols);
        }
        else {
            dispatch(fetchGeneralInfo());
        }
    },[])

    return (
        <div className="ag-theme-quartz">
            <AgGridReact 
                columnDefs={columnDefs}
                rowData={players}
                rowHeight={75}
                domLayout='autoHeight'
            />
        </div>
    )
}