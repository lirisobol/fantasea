import { ColDef } from "ag-grid-community";
import { Team } from "../../../models/gen-info/Team";
import { agHelpers } from "../ag-helpers";

class ClubsTableHelpers {
    public setColDef(teams: Team[], currentGameWeekId:number, numberOfGames:number): ColDef[] {
        const cols: ColDef[] = [
            {
                headerName: 'Team Name',
                field: 'name',
                minWidth:100,
                width:150,
                flex:1,
            },
            {
                headerName: 'Points',
                field: 'points',
                minWidth:75,
                width:100,
                flex:1
            },
            {
                headerName: 'Position',
                field: 'Position',
                minWidth:100,
                width:150,
                flex:1
            },
            ...agHelpers.generateFixtureCols(teams, currentGameWeekId, numberOfGames)
        ];
        return cols
    }
}
export const clubsTableHelpers = new ClubsTableHelpers();