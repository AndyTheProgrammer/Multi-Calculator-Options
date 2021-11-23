import { configureStore } from "@reduxjs/toolkit";
import getUnitMeasure from './slice/GetUnits'
import rootReducer from "./slice/RootReducer";

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;