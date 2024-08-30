import { ColDef } from "ag-grid-community";
import { Team } from "../../../models/general-info/Team";
import { Fixture } from "../../../models/general-info/Fixture";
import { CustomClubNameCell } from "../../Shared/CustomPlayerNameCell/CustomPlayerNameCell";

class LeagueTableConfig {
    public getLeagueTableColDefs(teams: Team[], currentGameWeekId: number): ColDef[] {
        const columns: ColDef[] = [
            { 
                headerName: "Team Name",
                field: "name",
                minWidth: 100,
                width: 150,
                flex: 1,
                cellRenderer: CustomClubNameCell 
            },
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
            width: 90,
            minWidth: 75,
            flex: 1,
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
            },
            cellClassRules: {
                'table-very-high-rank': (params) => {
                    const fixture = this.getFixtureForStrength(params.data, i, currentGameWeekId);
                    return this.determineStrength(fixture, params.data, teams) === 'very-high';
                },
                'table-high-rank': (params) => {
                    const fixture = this.getFixtureForStrength(params.data, i, currentGameWeekId);
                    return this.determineStrength(fixture, params.data, teams) === 'high';
                },
                'table-mid-rank': (params) => {
                    const fixture = this.getFixtureForStrength(params.data, i, currentGameWeekId);
                    return this.determineStrength(fixture, params.data, teams) === 'mid';
                },
                'table-low-rank': (params) => {
                    const fixture = this.getFixtureForStrength(params.data, i, currentGameWeekId);
                    return this.determineStrength(fixture, params.data, teams) === 'low';
                },
                'table-very-low-rank': (params) => {
                    const fixture = this.getFixtureForStrength(params.data, i, currentGameWeekId);
                    return this.determineStrength(fixture, params.data, teams) === 'very-low';
                },
            }
        }));
    }

    private getFixtureForStrength(team: Team, gameIndex: number, currentGameWeekId: number): Fixture | null {
        const fixtures = this.getNextGames(team.fixtures, currentGameWeekId);
        return fixtures.length > gameIndex ? fixtures[gameIndex] : null;
    }

    public getTeamShortNameById(teamId: number, teams: Team[]): string {
        const team = teams.find(team => team.id === teamId);
        return team ? team.short_name : 'Unknown';
    }

    public determineStrength(fixture: Fixture | null, team: Team, teams: Team[]): 'very-high' | 'high' | 'mid' | 'low' | 'very-low' {
        if (!fixture) return 'mid'; // Handle null fixture scenario
        const currentTeamDifficulty = team.id === fixture.team_h ? fixture.team_h_difficulty : fixture.team_a_difficulty;
        const opponentId = team.id === fixture.team_h ? fixture.team_a : fixture.team_h;
        const opponent = teams.find(t => t.id === opponentId);
        const opponentDifficulty = opponent ? (opponent.id === fixture.team_h ? fixture.team_h_difficulty : fixture.team_a_difficulty) : 0;

        if(currentTeamDifficulty > opponentDifficulty && currentTeamDifficulty - opponentDifficulty > 1) return 'very-low';
        if (currentTeamDifficulty > opponentDifficulty) return 'low';
        if (currentTeamDifficulty === opponentDifficulty) return 'mid';
        if(currentTeamDifficulty < opponentDifficulty && opponentDifficulty - currentTeamDifficulty > 1) return 'very-high';
        if (currentTeamDifficulty < opponentDifficulty) return 'high';

        return 'mid';
    }
}

export const leagueTableConfig = new LeagueTableConfig();
