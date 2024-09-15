import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";  // Import your AppThunk if using TypeScript or ensure you have a proper store configuration.

interface AlertState {
    message: string;
    type: 'error' | 'success';
    isVisible: boolean;
}

const initialState: AlertState = {
    message: '',
    type: 'error',
    isVisible: false,
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert(state, action: PayloadAction<{ message: string; type: 'error' | 'success' }>) {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.isVisible = true;
        },
        hideAlert(state) {
            state.isVisible = false;
        },
    }
});

export const { showAlert, hideAlert } = alertSlice.actions;

// Thunk to show alert with timeout
export const showAlertWithTimeout = (message: string, type: 'error' | 'success', timeout = 3000): AppThunk => dispatch => {
    dispatch(showAlert({ message, type }));

    setTimeout(() => {
        dispatch(hideAlert());
    }, timeout);
};

export default alertSlice.reducer;
