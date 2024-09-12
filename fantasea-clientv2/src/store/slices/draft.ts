import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Element } from "../../models/gen-info/Element";


const getPlaceholders = (count: number): Element[] => Array.from({ length: count }, () => ({ isPlaceholder: true }));
const getPlaceholder = (): Element => ({ isPlaceholder: true });

function getMaxLength(position: keyof PositionGroup): number {
    switch(position) {
        case 'goalkeepers': return 2; // example: max 2 goalkeepers
        case 'defenders': return 5; // max 5 defenders, adjust as needed
        case 'midfielders': return 5; // max 5 midfielders
        case 'attackers': return 3; // max 3 attackers
        default: return 5; // default max if not specified
    }
}
const elementTypeToPosition = (elementType: number): keyof PositionGroup => {
    switch(elementType) {
        case 1: return 'goalkeepers';
        case 2: return 'defenders';
        case 3: return 'midfielders';
        case 4: return 'attackers';
        default: throw new Error('Unknown element type');
    }
}
const sameTeamLimitCheck = (state: DraftState, teamCode: number): boolean => {
    const playersFromSameTeam = [
        ...state.players.squad.attackers,
        ...state.players.squad.defenders,
        ...state.players.squad.midfielders,
        ...state.players.squad.goalkeepers
    ].filter(player => player.team_code === teamCode);

    return playersFromSameTeam.length < 3; // Allow up to 3 players from the same team
};

const duplicateCheck = (state: DraftState, playerId: number): boolean => {
    // Check if the player exists in any position group or the bench
    const allPlayers = [
        ...state.players.squad.goalkeepers,
        ...state.players.squad.defenders,
        ...state.players.squad.midfielders,
        ...state.players.squad.attackers,
        ...state.players.bench
    ];
    
    return allPlayers.some(player => player.id === playerId);
}

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
        addPlayerToSquad(state: DraftState, action: PayloadAction<{ player: Element, element_type: number }>) {
            const { player, element_type } = action.payload;

            // Check for duplicate player
            if (duplicateCheck(state, player.id)) {
                console.log('This player is already in your squad or on the bench.');
                return; // Stop the execution if the player is a duplicate
            }

            if (!sameTeamLimitCheck(state, player.team_code)) {
                console.log('Cannot add more than 3 players from the same team');
                return; // Stop further execution if the team limit is reached
            }

            const position = elementTypeToPosition(element_type);
            const positionArray = state.players.squad[position];
            const placeholderIndex = positionArray.findIndex(p => p.isPlaceholder);

            if (placeholderIndex !== -1) {
                positionArray[placeholderIndex] = player;
                state.budget -= player.now_cost / 10;
            } else if (positionArray.length < getMaxLength(position)) {
                positionArray.push(player);
                state.budget -= player.now_cost / 10;
            }
        },
        addPlayerToBench(state, action: PayloadAction<Element>) {
            if (state.players.bench.length < 4) { 
                state.players.bench.push(action.payload);
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
