import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Element } from "../../models/gen-info/Element";

const MAX_GOALKEEPERS = 2;
const MAX_DEFENDERS = 5;
const MAX_MIDFIELDERS = 5;
const MAX_ATTACKERS = 3;

const getPlaceholders = (count: number): Element[] => 
    Array.from({ length: count }, () => ({ isPlaceholder: true }));
const getPlaceholder = (): Element => ({ isPlaceholder: true });

function getMaxLength(position: keyof PositionGroup): number {
    switch(position) {
        case 'goalkeepers': return MAX_GOALKEEPERS; // example: max 2 goalkeepers
        case 'defenders': return MAX_DEFENDERS; // max 5 defenders, adjust as needed
        case 'midfielders': return MAX_MIDFIELDERS; // max 5 midfielders
        case 'attackers': return MAX_ATTACKERS; // max 3 attackers
        default: return 0; // default max if not specified
    }
}
// Map element type number to position key
const elementTypeToPosition = (elementType: number): keyof PositionGroup => {
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
// Function to enforce limits on positions across squad and bench
const enforcePositionLimits = (state: DraftState, player: Element) => {
    const position = elementTypeToPosition(player.element_type);
    const totalInPosition = state.players.squad[position].filter(p => !p.isPlaceholder).length +
                            state.players.bench.filter(p => elementTypeToPosition(p.element_type) === position).length;

    if (totalInPosition >= getMaxLength(position)) {
        console.log(`Cannot add more than ${getMaxLength(position)} ${position}.`);
        return false;
    }
    return true;
};

const sameTeamLimitCheck = (state: DraftState, teamCode: number): boolean => {
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
const isDuplicatePlayer = (state: DraftState, playerId: number) => {
    return [...state.players.squad.goalkeepers, ...state.players.squad.defenders, 
            ...state.players.squad.midfielders, ...state.players.squad.attackers,
            ...state.players.bench].some(player => player.id === playerId);
};

interface PositionGroup {
    goalkeepers: Element[];
    defenders: Element[];
    midfielders: Element[];
    attackers: Element[];
}

interface DraftState {
    budget: number;
    formation: string;
    players: {
        squad: PositionGroup;
        bench: Element[];
    };
}

const initialState: DraftState = {
    budget: 100,
    formation: "4-4-2",
    players: {
        squad: {
            goalkeepers: getPlaceholders(1), // Ensure this returns a proper array
            defenders: getPlaceholders(4),
            midfielders: getPlaceholders(4),
            attackers: getPlaceholders(2),
        },
        bench: getPlaceholders(4),
    }
};

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        setFormation(state, action: PayloadAction<string>) {
            state.formation = action.payload;
        },
        setBudget(state, action: PayloadAction<number>) {
            state.budget = action.payload;
        },
        addPlayerToSquad(state, action: PayloadAction<{ player: Element }>) {
            const { player } = action.payload;
            const element_type = player.element_type;

            if (isDuplicatePlayer(state, player.id)) {
                console.log('Player is already selected.');
                return;
            }
            if (!enforcePositionLimits(state, player)) return;
            if(!sameTeamLimitCheck(state, player.team_code)) {
                console.log("cannot add more than 3 players of the same team");
                return 
            }

            const positionArray = state.players.squad[elementTypeToPosition(element_type)];
            const placeholderIndex = positionArray.findIndex(p => p.isPlaceholder);

            if (placeholderIndex !== -1) {
                positionArray[placeholderIndex] = player;
                state.budget -= player.now_cost / 10;
            } else {
                console.log('Position full, cannot add.');
            }
        },
        addPlayerToBench(state, action: PayloadAction<Element>) {
            if (state.players.bench.filter(p => !p.isPlaceholder).length >= 4) {
                console.log('Bench is full.');
                return;
            }
            const player = action.payload;
            if (isDuplicatePlayer(state, player.id)) {
                console.log('Player is already selected.');
                return;
            }
            if (!enforcePositionLimits(state, player)) return;
            if(!sameTeamLimitCheck(state, player.team_code)) {
                console.log("cannot add more than 3 players of the same team");
                return 
            }

            const placeholderIndex = state.players.bench.findIndex(p => p.isPlaceholder);
            if (placeholderIndex !== -1) {
                state.players.bench[placeholderIndex] = player;
            } else {
                console.log('No space on bench.');
            }
        },
        removePlayerFromSquad(state, action: PayloadAction<{ index: number, element_type: number }>) {
            const position = elementTypeToPosition(action.payload.element_type);
            // Replace the player with a placeholder instead of removing it
            if (state.players.squad[position][action.payload.index]) {
                const player = state.players.squad[position][action.payload.index];
                state.budget = state.budget + player.now_cost/10                
                state.players.squad[position][action.payload.index] = getPlaceholder();
            }
        },
        removePlayerFromBench(state, action: PayloadAction<number>) {
            state.players.bench.splice(action.payload, 1);
        },
        resetDraft(state) {
            state.players.squad = { goalkeepers: getPlaceholders(1), defenders: getPlaceholders(4), midfielders: getPlaceholders(4), attackers: getPlaceholders(2) };
            state.players.bench = getPlaceholders(4);
            state.budget = 100;
        }
    }
});

export const {
    setFormation,
    setBudget,
    addPlayerToSquad,
    addPlayerToBench,
    removePlayerFromSquad,
    removePlayerFromBench,
    resetDraft
} = draftSlice.actions;

export default draftSlice.reducer;
