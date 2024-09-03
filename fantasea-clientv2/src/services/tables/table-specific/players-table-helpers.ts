import { ColDef } from "ag-grid-community";
import { agHelpers } from "../ag-helpers";
import { Team } from "../../../models/gen-info/Team";
import { CustomPlayerName } from "../../../components/Tables/CustomCells/CustomPlayerName/CustomPlayerName";

class PlayersTableHelpers {
    public setColDef(teams: Team[], players:Element[], currentGameWeekId:number, numberOfGames:number): ColDef[] {
        const cols:ColDef[] = [
            { 
                headerName: "Player Name",
                field: "web_name",
                minWidth:130,
                width:150,
                flex:1,
                cellRenderer: CustomPlayerName

            },
            { 
                headerName: "Price",
                field: "now_cost",
                width: 75,
                minWidth: 75,
                flex: 1,
                valueFormatter: params => `${params.value / 10}m` 
            },
            { 
                headerName: "Selected By (%)",
                field: "selected_by_percent",
                width: 75,
                minWidth: 75,
                flex: 1,
            },
            { 
                headerName: "Total Points",
                field: "total_points",
                width: 75,
                minWidth: 75,
                flex: 1,
            },
            ...agHelpers.generatePlayerFixtureCols(teams, players, currentGameWeekId, numberOfGames)
        ]
        return cols
    }
}
export const playersTableHelpers = new PlayersTableHelpers();