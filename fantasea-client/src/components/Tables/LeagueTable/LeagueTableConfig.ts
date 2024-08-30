import { ColDef } from "ag-grid-community";
import { Team } from "../../../models/general-info/Team";
import { Fixture } from "../../../models/general-info/Fixture";

class LeagueTableConfig {
    // Method to generate columns including next games with dynamic headers
    public getLeagueTableColDefs(teams: Team[], currentGameWeekId: number): ColDef[] {
        const columns: ColDef[] = [
            { headerName: "Team Name", field: "name", minWidth: 100, width: 150, flex: 1 },
            { headerName: "Points", field: "points", minWidth: 75, width: 100, flex: 1 },
            { headerName: "Position", field: "position", minWidth: 75, width: 100, flex: 1 },
            ...this.generateGameColumns(teams, currentGameWeekId)
        ];

        return columns;
    }

    public getNextGames(teamFixtures: Fixture[], currentGameWeekId: number): Fixture[] {
        return teamFixtures
            .filter(fixture => fixture.event > currentGameWeekId)
            .sort((a, b) => a.event - b.event)
            .slice(0, 5);
    }

    public generateGameColumns(teams: Team[], currentGameWeekId: number): ColDef[] {
        return Array.from({ length: 5 }, (_, i) => ({
            headerName: `Gameweek ${currentGameWeekId + i + 1}`,
            minWidth: 100,
            valueGetter: (params) => {
                const fixtures = this.getNextGames(params.data.fixtures, currentGameWeekId);
                if (fixtures.length > i) {
                    const fixture = fixtures[i];
                    const opponentId = params.data.id === fixture.team_h ? fixture.team_a : fixture.team_h;
                    const homeOrAway = params.data.id === fixture.team_h ? "(H)" : "(A)";
                    const opponentName = this.getTeamShortNameById(opponentId, teams);
                    return `${opponentName} ${homeOrAway}`;
                }
                return '-';
            }
        }));
    }

    public getTeamShortNameById(teamId: number, teams: Team[]): string {
        const team = teams.find(team => team.id === teamId);
        return team ? team.short_name : 'Unknown';
    }
}

export const leagueTableConfig = new LeagueTableConfig();
