import { ColDef } from "ag-grid-community";
import { Team } from "../../../models/gen-info/Team";
import { agHelpers } from "../ag-helpers";
import { CustomClubName } from "../../../components/Tables/CustomCells/CustomClubName/CustomClubName";

class ClubsTableHelpers {
    public setColDef(teams: Team[], currentGameWeekId:number, numberOfGames:number): ColDef[] {
        const cols: ColDef[] = [
            {
                headerName: 'Team Name',
                field: 'name',
                minWidth:130,
                width:150,
                flex:1,
                cellRenderer: CustomClubName
            },
            {
                headerName: 'Points',
                field: 'points',
                minWidth:75,
                width:75,
                flex:1
            },
            {
                headerName: 'Position',
                field: 'position',
                minWidth:75,
                width:75,
                flex:1
            },
            ...agHelpers.generateClubFixtureCols(teams, currentGameWeekId, numberOfGames)
        ];
        return cols
    }
}
export const clubsTableHelpers = new ClubsTableHelpers();