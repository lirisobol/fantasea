import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Element } from "../../../models/gen-info/Element";
import { elementTypeToPosition, getPlaceholder, getPlaceholders, validatePlayerAddition } from "./draftHelpers";
import { showAlert } from "../alert";

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
            goalkeepers: getPlaceholders(1),
            defenders: getPlaceholders(4),
            midfielders: getPlaceholders(4),
            attackers: getPlaceholders(2),
        },
        bench: getPlaceholders(4),
    }
};

// Thunk for adding player to squad
export const addPlayerToSquad = createAsyncThunk(
    'draft/addPlayerToSquad',
    async ({ player }, { getState, dispatch }) => {
        const state = getState().draft;
        const element_type = player.element_type;
        const validation = validatePlayerAddition(state, player);

        if (!validation.isValid) {
            dispatch(showAlert({ message: validation.message, type: 'error' }));
            throw new Error(validation.message);
        }

        const positionArray = state.players.squad[elementTypeToPosition(element_type)];
        const placeholderIndex = positionArray.findIndex(p => p.isPlaceholder);

        if (placeholderIndex !== -1) {
            dispatch(updatePlayerInSquad({ index: placeholderIndex, player, position: elementTypeToPosition(element_type) }));
        } else {
            throw new Error('Position full, cannot add.');
        }
    }
);
// Thunk for adding player to bench
export const addPlayerToBench = createAsyncThunk(
    'draft/addPlayerToBench',
    async (player: Element, { getState, dispatch }) => {
        const state = getState().draft;
        const validation = validatePlayerAddition(state, player);

        if (!validation.isValid) {
            dispatch(showAlert({ message: validation.message, type: 'error' }));
            throw new Error(validation.message);
        }

        const placeholderIndex = state.players.bench.findIndex(p => p.isPlaceholder);
        if (placeholderIndex !== -1) {
            return { ...state, budget: state.budget - player.now_cost / 10, index: placeholderIndex, player };
        } else {
            throw new Error('Bench is full, cannot add.');
        }
    }
);
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
        updatePlayerInSquad(state, action: PayloadAction<{ index: number; player: Element; position: keyof PositionGroup }>) {
            const { index, player, position } = action.payload;
            state.players.squad[position][index] = player;
            state.budget -= player.now_cost / 10;
        },
        removePlayerFromSquad(state, action: PayloadAction<{ index: number, element_type: number }>) {
            const position = elementTypeToPosition(action.payload.element_type);
            const player = state.players.squad[position][action.payload.index];
            state.budget += player.now_cost / 10;
            state.players.squad[position][action.payload.index] = getPlaceholder();
        },
        removePlayerFromBench(state, action: PayloadAction<number>) {
            const player = state.players.bench[action.payload];
            state.budget += player.now_cost / 10;
            state.players.bench[action.payload] = getPlaceholder();
        },
        resetDraft(state) {
            state.players.squad = { goalkeepers: getPlaceholders(1), defenders: getPlaceholders(4), midfielders: getPlaceholders(4), attackers: getPlaceholders(2) };
            state.players.bench = getPlaceholders(4);
            state.budget = 100;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPlayerToSquad.fulfilled, (state, action) => {
                if (action.payload) {
                    state.players.squad[action.payload.position][action.payload.index] = action.payload.player;
                    state.budget = action.payload.budget;
                }
            })
            .addCase(addPlayerToSquad.rejected, (state, action) => {
                console.error('Failed to add player to squad:', action.error.message);
            })
            .addCase(addPlayerToBench.fulfilled, (state, action) => {
                if (action.payload) {
                    state.players.bench[action.payload.index] = action.payload.player;
                    state.budget = action.payload.budget;
                }
            })
            .addCase(addPlayerToBench.rejected, (state, action) => {
                console.error('Failed to add player to bench:', action.error.message);
            });
    }
});

export const {
    setFormation,
    setBudget,
    removePlayerFromSquad,
    removePlayerFromBench,
    resetDraft,
    updatePlayerInSquad
} = draftSlice.actions;

export default draftSlice.reducer;
