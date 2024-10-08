import { ColDef } from "ag-grid-community";
import { Fixture } from "../../models/gen-info/Fixture";
import { Team } from "../../models/gen-info/Team";
import { OpponentCell } from "../../components/Tables/CustomCells/OpponentCell/OpponentCell";
import { Element } from "../../models/gen-info/Element";
import { generalHelpers } from "../general-helpers/general-helpers";
class AgHelpers {  
    /* Fixture Cols Configs And Helpers
    --------------------------------------------------------------------------------------------------------------------------------
    */
    public generatePlayerFixtureCols(teams: Team[], players: Element[], currentGameWeekId: number, numberOfGames: number): ColDef[] {
        return Array.from({ length: numberOfGames }, (_, i) => ({
            headerName: `GW ${currentGameWeekId + i + 1}`,
            width: 75,
            minWidth: 75,
            flex: 1,
            cellRenderer: OpponentCell,
            valueGetter: (params) => {
                const player = params.data as Element;
                const team = teams.find(t => t.id === player.team);
                if (!team || !team.fixtures) return '-'; // Handle no team or no fixtures case

                const fixtures = generalHelpers.getNextGamesForClub(team.fixtures, currentGameWeekId);
                if (fixtures.length > i) {
                    const fixture = fixtures[i];
                    const opponentId = team.id === fixture.team_h ? fixture.team_a : fixture.team_h;
                    const homeOrAway = team.id === fixture.team_h ? "(H)":"(A)";
                    const opponentName = generalHelpers.getTeamShortNameById(opponentId, teams);
                    return `${opponentName}${homeOrAway}`;
                }
                
                return '-';
            },
            cellClassRules: {
                'bg-very-high': (params) => {
                    const team = generalHelpers.getTeamByPlayer(params.data, teams);
                    const fixture = this.generatePlayersFixtureForStrength(params.data, teams, i, currentGameWeekId)
                    return this.determineStrength(fixture, team, teams) === 'very-high';
                    
                },
                'bg-high': (params) => {
                    const team = generalHelpers.getTeamByPlayer(params.data, teams);
                    const fixture = this.generatePlayersFixtureForStrength(params.data, teams, i, currentGameWeekId)
                    return this.determineStrength(fixture, team, teams) === 'high';
                    
                },
                'bg-mid': (params) => {
                    const team = generalHelpers.getTeamByPlayer(params.data, teams);
                    const fixture = this.generatePlayersFixtureForStrength(params.data, teams, i, currentGameWeekId)
                    return this.determineStrength(fixture, team, teams) === 'mid'
                },
                'bg-low': (params) => {
                    const team = generalHelpers.getTeamByPlayer(params.data, teams);
                    const fixture = this.generatePlayersFixtureForStrength(params.data, teams, i, currentGameWeekId)
                    return this.determineStrength(fixture, team, teams) === 'low'
                },
                'bg-very-low': (params) => {
                    const team = generalHelpers.getTeamByPlayer(params.data, teams);
                    const fixture = this.generatePlayersFixtureForStrength(params.data, teams, i, currentGameWeekId)
                    return this.determineStrength(fixture, team, teams) === 'very-low'
                },

            }
        }));
    }
    public generateClubFixtureCols(teams: Team[], currentGameWeekId: number, numberOfGames:number): ColDef[] {
        return Array.from({ length: numberOfGames }, (_, i) => ({
            headerName: `Gameweek ${currentGameWeekId + i + 1}`,
            width: 75,
            minWidth: 75,
            flex: 1,
            cellRenderer: OpponentCell,
            valueGetter: (params) => {
                const fixtures = generalHelpers.getNextGamesForClub(params.data.fixtures, currentGameWeekId);
                if (fixtures.length > i) {
                    const fixture = fixtures[i];
                    const opponentId = params.data.id === fixture.team_h ? fixture.team_a : fixture.team_h;
                    const homeOrAway = params.data.id === fixture.team_h ? "(H)":"(A)";
                    const opponentName = generalHelpers.getTeamShortNameById(opponentId, teams);
                    return `${opponentName}${homeOrAway}`;
                }
                return '-';
            },
            cellClassRules: {
                'bg-very-high': (params) => {
                    const fixture = this.generateClubFixtureForStrength(params.data, i, currentGameWeekId);
                    return this.determineStrength(fixture, params.data, teams) === 'very-high';
                },
                'bg-high': (params) => {
                    const fixture = this.generateClubFixtureForStrength(params.data, i, currentGameWeekId);
                    return this.determineStrength(fixture, params.data, teams) === 'high';
                },
                'bg-mid': (params) => {
                    const fixture = this.generateClubFixtureForStrength(params.data, i, currentGameWeekId);
                    return this.determineStrength(fixture, params.data, teams) === 'mid';
                },
                'bg-low': (params) => {
                    const fixture = this.generateClubFixtureForStrength(params.data, i, currentGameWeekId);
                    return this.determineStrength(fixture, params.data, teams) === 'low';
                },
                'bg-very-low': (params) => {
                    const fixture = this.generateClubFixtureForStrength(params.data, i, currentGameWeekId);
                    return this.determineStrength(fixture, params.data, teams) === 'very-low';
                },
            }
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
    public generateClubFixtureForStrength(team: Team, gameIndex: number, currentGameWeekId: number): Fixture | null {
        const fixtures = generalHelpers.getNextGamesForClub(team.fixtures, currentGameWeekId);
        return fixtures.length > gameIndex ? fixtures[gameIndex] : null;
    }
    public generatePlayersFixtureForStrength(player: Element, teams: Team[], gameIndex: number, currentGameWeekId: number): Fixture | null {
        const teamId = player.team_code;
        const team = teams.find(t => t.code === teamId)
        const fixtures = generalHelpers.getNextGamesForClub(team.fixtures, currentGameWeekId);
        return fixtures.length > gameIndex ? fixtures[gameIndex] : null;
    }
}
export const agHelpers = new AgHelpers();