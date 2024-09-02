import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { useAppDispatch} from '../../store/store';
import { useEffect, useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { clubsTableHelpers } from '../../services/tables/table-specific/clubs-table-helpers';
import { Team } from '../../models/gen-info/Team';
import { fetchGeneralInfo } from '../../store/slices/gen-info';

interface ClubsTableProps {
    teams: Team[];
    currentGameWeekId: number;
}
export const ClubsTable = ({teams, currentGameWeekId}:ClubsTableProps):JSX.Element => {
    const dispatch = useAppDispatch();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

    useEffect(() => {
        if(!teams) {
            dispatch(fetchGeneralInfo())
        }
        const cols = clubsTableHelpers.setColDef(teams, currentGameWeekId, 5);
        setColumnDefs(cols)
    },[])
    return (
        <>
            {teams &&
                <div className='ag-theme-quartz'>
                    <AgGridReact 
                    columnDefs={columnDefs}
                    rowData={teams}
                    rowHeight={75}
                    domLayout='autoHeight'
                    />
                </div>
            }
        </>
    )
}