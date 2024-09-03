import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    positionType: number;
    teamCode: number;
    searchQuery: string;
};

const initialState: FilterState = {
    positionType: 0,
    teamCode: 0,
    searchQuery: "",
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setPositionType(state, action:PayloadAction<number>) {
            state.positionType = action.payload;
        },
        setTeam(state, action:PayloadAction<number>) {
            state.teamCode = action.payload;
        },
        setSearchQuery(state, action:PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    }
});

export const { setPositionType, setTeam, setSearchQuery} = filterSlice.actions;
export default filterSlice.reducer;