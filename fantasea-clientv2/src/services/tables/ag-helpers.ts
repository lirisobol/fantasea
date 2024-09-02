import { ColDef } from "ag-grid-community";
import { Fixture } from "../../models/gen-info/Fixture";
import { Team } from "../../models/gen-info/Team";

class AgHelpers {  
    /* Fixture Cols Configs And Helpers
    --------------------------------------------------------------------------------------------------------------------------------
    */
    public generateFixtureCols(teams: Team[], currentGameWeekId: number, numberOfGames:number): ColDef[] {
        return Array.from({ length: numberOfGames }, (_, i) => ({
            headerName: `Gameweek ${currentGameWeekId + i + 1}`,
            width: 90,
            minWidth: 75,
            flex: 1,
            valueGetter: (params) => {
                const fixtures = this.getNextGamesForClub(params.data.fixtures, currentGameWeekId);
                if (fixtures.length > i) {
                    const fixture = fixtures[i];
                    const opponentId = params.data.id === fixture.team_h ? fixture.team_a : fixture.team_h;
                    const homeOrAway = params.data.id === fixture.team_h ? "(H)" : "(A)";
                    const opponentName = this.getTeamShortNameById(opponentId, teams);
                    return `${opponentName} ${homeOrAway}`;
                }
                return '-';
            },
            // cellClassRules: {
            //     'table-very-high-rank': (params) => {
            //         const fixture = this.getFixtureForStrengthFunction(params.data, i, currentGameWeekId);
            //         return this.determineStrength(fixture, params.data, teams) === 'very-high';
            //     },
            //     'table-high-rank': (params) => {
            //         const fixture = this.getFixtureForStrengthFunction(params.data, i, currentGameWeekId);
            //         return this.determineStrength(fixture, params.data, teams) === 'high';
            //     },
            //     'table-mid-rank': (params) => {
            //         const fixture = this.getFixtureForStrengthFunction(params.data, i, currentGameWeekId);
            //         return this.determineStrength(fixture, params.data, teams) === 'mid';
            //     },
            //     'table-low-rank': (params) => {
            //         const fixture = this.getFixtureForStrengthFunction(params.data, i, currentGameWeekId);
            //         return this.determineStrength(fixture, params.data, teams) === 'low';
            //     },
            //     'table-very-low-rank': (params) => {
            //         const fixture = this.getFixtureForStrengthFunction(params.data, i, currentGameWeekId);
            //         return this.determineStrength(fixture, params.data, teams) === 'very-low';
            //     },
            // }
        }));
    }


    /* 
        Strength determination method 
        - inputs :
        ** fixture - Fixture Model
        ** team - current team tracker
        ** teams - rest of teams array
        - returns :
            1 - 5 rating translated into 'levels', 
            used for conditional coloring and strength determination
    */
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
    
    private getFixtureForStrengthFunction(team: Team, gameIndex: number, currentGameWeekId: number): Fixture | null {
        const fixtures = this.getNextGamesForClub(team.fixtures, currentGameWeekId);
        return fixtures.length > gameIndex ? fixtures[gameIndex] : null;
    }

    /* 
        ** teamFixtures - Fixture[] of a specific team
        ** currentGameWeek - Id number of current gameweek
        might be located in the main redux store.
    */
    public getNextGamesForClub(teamFixtures: Fixture[], currentGameWeekId: number): Fixture[] {
        return teamFixtures
            .filter(fixture => fixture.event > currentGameWeekId)
            .sort((a, b) => a.event - b.event)
            .slice(0, 5);
    }

    // Get Shortname by team code
    public getTeamShortNameById(teamId: number, teams: Team[]): string {
        const team = teams.find(team => team.id === teamId);
        return team ? team.short_name : 'Unknown';
    }

    
}
export const agHelpers = new AgHelpers();