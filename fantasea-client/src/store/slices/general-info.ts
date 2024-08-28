import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GeneralInfo from "../../models/general-info/general-info";
import { generalInfoService } from "../../services/general-info";

interface GeneralInfoState {
    data: GeneralInfo | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: GeneralInfoState = {
    data: null,
    status: 'idle',
    error: null
};

export const fetchGeneralInfo = createAsyncThunk(
    'generalInfo/fetchGeneralInfo',
    async (_, {rejectWithValue}) => {
        try {
            const data = await generalInfoService.fetchGeneralInfo();
            return data;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (error) {
            return rejectWithValue('Failed to fetch general information')
        }
    }
)

const generalInfoSlice = createSlice({
    name:"generalInfo",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(fetchGeneralInfo.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchGeneralInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchGeneralInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string
            })
    }
})
export default generalInfoSlice.reducer;