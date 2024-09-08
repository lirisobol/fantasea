
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { ColDef, SelectionChangedEvent } from "ag-grid-community";
import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { Element } from "../../models/gen-info/Element";
import { playersTableHelpers } from "../../services/tables/table-specific/players-table-helpers";
import { fetchGeneralInfo } from "../../store/slices/gen-info";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { addPlayer } from "../../store/slices/player-compare";

interface PlayersTableSelectableProps {
    onHide: () => void;
}
export const PlayersTableSelectable = ({onHide}: PlayersTableSelectableProps):JSX.Element => {
    
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
    
    const onSelectionChanged = useCallback((event:SelectionChangedEvent) => {
        const selectedNode = event.api.getSelectedNodes()[0];
        const selectedData = selectedNode ? selectedNode.data : null;
        if (selectedData) {
            dispatch(addPlayer(selectedData))
            onHide();
        }
    }, [dispatch, onHide]);

    return (
        <div className="ag-theme-quartz">
            <AgGridReact 
                columnDefs={columnDefs}
                rowData={players}
                rowHeight={75}
                domLayout='autoHeight'
                rowSelection={"single"}
                onSelectionChanged={onSelectionChanged}

            />
        </div>
    )
}