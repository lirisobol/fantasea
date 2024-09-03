import { ColDef } from "ag-grid-community";
import { agHelpers } from "../ag-helpers";
import { Team } from "../../../models/gen-info/Team";

class PlayersTableHelpers {
    public setColDef(teams: Team[], players:Element[], currentGameWeekId:number, numberOfGames:number): ColDef[] {
        const cols:ColDef[] = [
            { 
                headerName: "Player Name",
                field: "web_name",
            },
            { headerName: "Price", field: "now_cost", sortable: true, valueFormatter: params => `${params.value / 10}m` },
            { headerName: "Selected By (%)", field: "selected_by_percent", sortable: true},
            { headerName: "Total Points", field: "total_points", sortable: true},
            ...agHelpers.generatePlayerFixtureCols(teams,players, currentGameWeekId, numberOfGames)
        ]
        return cols
    }
}
export const playersTableHelpers = new PlayersTableHelpers();