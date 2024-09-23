import { Fixture } from "../../models/gen-info/Fixture";
import { Team } from "../../models/gen-info/Team";
import { Element } from "../../models/gen-info/Element";
import { ElementType } from "../../models/gen-info/ElementType";

class GeneralHelpers {
    // Method to determine the result of the game for a specific team
    public getGameResult(fixture: Fixture, teamId: number): string {
        if (!fixture.finished) {
            return 'Pending'; // If the game isn't finished yet
        }

        // Determine if the team in question is the home team or the away team
        const isHomeTeam = teamId === fixture.team_h;
        
        const teamScore = isHomeTeam ? fixture.team_h_score : fixture.team_a_score;
        const opponentScore = isHomeTeam ? fixture.team_a_score : fixture.team_h_score;

        if (teamScore > opponentScore) {
            return 'Win';
        } else if (teamScore < opponentScore) {
            return 'Lose';
        } else {
            return 'Draw';
        }
    }

    public getDifficultyRating(fixture: Fixture, teamId: number): number {
        if(fixture.team_a === teamId) return fixture.team_a_difficulty;
        if(fixture.team_h === teamId) return fixture.team_h_difficulty;
        return 3;      
    }
    

    public getDifficultyColor(difficulty: number): string {
        console.log(difficulty);
        
        switch (difficulty) {
            case 1:
                return "green-600";  // Easiest
            case 2:
                return "green-500";
            case 3:
                return "green-300";  // Moderate
            case 4:
                return "red-400";
            case 5:
                return "red-500";    // Hardest
            default:
                return "gray-200";   // Fallback for unexpected values
        }
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
    
        // Get team by player
        public getTeamByPlayer(player: Element, teams: Team[]): Team {
            const teamId = player.team_code;
            return teams.find(t => t.code === teamId) as Team;
        }
    
        // get opponent teamId
        public getOpponentTeamId(fixture:Fixture, playerTeam: Team): number {
            let opponentId = 0;
            if(playerTeam.id === fixture.team_h) opponentId = fixture.team_a;
            if(playerTeam.id === fixture.team_a) opponentId = fixture.team_h;        
            return opponentId;
        }
    
        // Helper function to get opponent name with home/away string
        public getOpponentName(fixture: Fixture,opponentId:number,  teams: Team[]): string {
            if(opponentId === fixture.team_a) return `${this.getTeamShortNameById(opponentId, teams)} (H)`
            else {
                return `${this.getTeamShortNameById(opponentId,teams)} (A)`
            }
        }
    
        public getPlayerPositionStringByPlayer(player: Element, elementTypes: ElementType[]): string {
            const element_type = player.element_type
            const position:ElementType = elementTypes.find(elementType => elementType.id === element_type)
            const positionString = position.singular_name;
            return positionString;
        }

        public formatKickoffTime(kickoffTime:string):string {
            const date = new Date(kickoffTime);
            const year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }

            return (year+'-' + month + '-'+ dt)
        }
}
export const generalHelpers = new GeneralHelpers();
