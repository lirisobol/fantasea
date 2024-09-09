import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import genInfoReducer from "./slices/gen-info";
import filterReducer from "./slices/filters";
import playerCompare from "./slices/player-compare";
import draft from "./slices/draft";

export const store = configureStore({
    reducer: {
        genInfo: genInfoReducer,
        filters: filterReducer,
        playerCompare: playerCompare,
        draft: draft,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) => useSelector(selector);