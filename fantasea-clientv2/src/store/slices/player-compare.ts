import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Element } from "../../models/gen-info/Element";
interface PlayerCompareState {
    selectedPlayers: Element[];
};

const initialState: PlayerCompareState = {
    selectedPlayers: []
};

const playerCompareSlice = createSlice({
    name: 'playersCompare',
    initialState,
    reducers: {
        addPlayer(state, action: PayloadAction<Element>) {
            if(state.selectedPlayers.length < 3) {
                state.selectedPlayers.push(action.payload);
            }
        },
        removePlayer(state, action: PayloadAction<number>) {
            state.selectedPlayers = state.selectedPlayers.filter(p => p.id !== action.payload);
        },
        clearAllPlayers(state) {
            state.selectedPlayers = []
        },
    }
})

export const {addPlayer, removePlayer, clearAllPlayers} = playerCompareSlice.actions;
export default playerCompareSlice.reducer;