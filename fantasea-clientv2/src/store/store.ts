import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import genInfoReducer from "./slices/gen-info";
import filterReducer from "./slices/filters";

export const store = configureStore({
    reducer: {
        genInfo: genInfoReducer,
        filters: filterReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) => useSelector(selector);