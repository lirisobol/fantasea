import { Element } from "../../../models/gen-info/Element";

const MAX_GOALKEEPERS = 2;
const MAX_DEFENDERS = 5;
const MAX_MIDFIELDERS = 5;
const MAX_ATTACKERS = 3;
// Assuming DraftState and Element are imported or defined in the same file
export const validatePlayerAddition = (state, player: Element): { isValid: boolean, message?: string } => {
    // Check for duplicate player
    if (isDuplicatePlayer(state, player.id)) {
        return { isValid: false, message: "This player is already in your squad or on the bench." };
    }
    // Check position limits
    if (!enforcePositionLimits(state, player)) {
        const position = elementTypeToPosition(player.element_type);
        return { isValid: false, message: `Cannot add more than ${getMaxLength(position)} players to ${position}.` };
    }
    // Check team limits
    if (!sameTeamLimitCheck(state, player.team_code)) {
        return { isValid: false, message: "Cannot add more than 3 players from the same team." };
    }
    // If all checks pass
    return { isValid: true };
};
// Function to enforce limits on positions across squad and bench
export const enforcePositionLimits = (state: DraftState, player: Element) => {
    const position = elementTypeToPosition(player.element_type);
    const totalInPosition = state.players.squad[position].filter(p => !p.isPlaceholder).length +
    state.players.bench.filter(p => elementTypeToPosition(p.element_type) === position).length;

    if (totalInPosition >= getMaxLength(position)) {
        console.log(`Cannot add more than ${getMaxLength(position)} ${position}.`);
        return false;
    }
    return true;
};
export const sameTeamLimitCheck = (state: DraftState, teamCode: number): boolean => {
    const playersFromSameTeam = [
        ...state.players.squad.attackers,
        ...state.players.squad.defenders,
        ...state.players.squad.midfielders,
        ...state.players.squad.goalkeepers,
        ...state.players.bench
    ].filter(player => player.team_code === teamCode);

    return playersFromSameTeam.length < 3; // Allow up to 3 players from the same team
};
// Check for duplicate player
export const isDuplicatePlayer = (state: DraftState, playerId: number) => {
    return [...state.players.squad.goalkeepers, ...state.players.squad.defenders, 
            ...state.players.squad.midfielders, ...state.players.squad.attackers,
            ...state.players.bench].some(player => player.id === playerId);
};
// Map element type number to position key
export const elementTypeToPosition = (elementType: number): keyof PositionGroup => {
    console.log(`element type:`,elementType);
    if(elementType) {
        switch(elementType) {
            case 1: return 'goalkeepers';
            case 2: return 'defenders';
            case 3: return 'midfielders';
            case 4: return 'attackers';
            default: throw new Error('Unknown element type');
        }
    }
};
export function getMaxLength(position: keyof PositionGroup): number {
    switch(position) {
        case 'goalkeepers': return MAX_GOALKEEPERS; // example: max 2 goalkeepers
        case 'defenders': return MAX_DEFENDERS; // max 5 defenders, adjust as needed
        case 'midfielders': return MAX_MIDFIELDERS; // max 5 midfielders
        case 'attackers': return MAX_ATTACKERS; // max 3 attackers
        default: return 0; // default max if not specified
    }
}
export const getPlaceholders = (count: number): Element[] => 
    Array.from({ length: count }, () => ({ isPlaceholder: true }));
export const getPlaceholder = (): Element => ({ isPlaceholder: true });