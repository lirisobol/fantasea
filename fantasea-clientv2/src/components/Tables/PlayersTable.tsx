import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import { playersTableHelpers } from '../../services/tables/table-specific/players-table-helpers';
import { Team } from '../../models/gen-info/Team';
import { Element } from '../../models/gen-info/Element';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchGeneralInfo } from '../../store/slices/gen-info';
import useFilteredPlayers from '../../hooks/useFilteredPlayers';

interface PlayersTableProps {
    teams: Team[];
    currentGameWeekId: number
}
export const PlayersTable = ({teams, currentGameWeekId}: PlayersTableProps):JSX.Element => {
    const dispatch = useAppDispatch();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

    const teamCode = useAppSelector((state) => state.filters.teamCode);
    const positionType = useAppSelector((state) => state.filters.positionType);
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);
    const minPrice = useAppSelector((state) => state.filters.minPrice);
    const maxPrice = useAppSelector((state) => state.filters.maxPrice);

    const players:Element[] = useFilteredPlayers(teamCode, positionType, searchQuery, minPrice, maxPrice);
    console.log(players);
    

    useEffect(() => {
        if(teams && players  && currentGameWeekId) {
            
            const cols = playersTableHelpers.setColDef(teams, players, currentGameWeekId, 5);
            setColumnDefs(cols);
        }
        dispatch(fetchGeneralInfo());
    },[])


    return (
        <div className='ag-theme-quartz'>
            <AgGridReact 
                columnDefs={columnDefs}
                rowData={players}
                rowHeight={75}
                domLayout='autoHeight'
            />
        </div>
    )
}