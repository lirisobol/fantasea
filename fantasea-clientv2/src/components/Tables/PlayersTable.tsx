import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import { playersTableHelpers } from '../../services/tables/table-specific/players-table-helpers';
import { Team } from '../../models/gen-info/Team';
import { useAppDispatch } from '../../store/store';
import { fetchGeneralInfo } from '../../store/slices/gen-info';

interface PlayersTableProps {
    teams: Team[];
    players: Element[];
    currentGameWeekId: number
}
export const PlayersTable = ({teams, players, currentGameWeekId}: PlayersTableProps):JSX.Element => {
    const dispatch = useAppDispatch();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

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