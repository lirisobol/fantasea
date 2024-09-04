import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface FilterState {
    positionType: number;
    teamCode: number;
    searchQuery: string;
    minPrice: number;
    maxPrice: number;
};

const initialState: FilterState = {
    positionType: 0,
    teamCode: 0,
    searchQuery: "",
    minPrice : 4,
    maxPrice: 16,
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
        setFiltersMinPrice(state, action:PayloadAction<number>) {
            state.minPrice = action.payload;
        },
        setFiltersMaxPrice(state, action:PayloadAction<number>) {
            state.maxPrice = action.payload
        }
    }
});

export const { setPositionType, setTeam, setSearchQuery, setFiltersMinPrice, setFiltersMaxPrice} = filterSlice.actions;
export default filterSlice.reducer;